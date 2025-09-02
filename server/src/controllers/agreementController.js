import Agreement from "../models/Agreement.js";
import Payment from "../models/PaymentModel.js";

// ✅ Create new Agreement
export const createAgreement = async (req, res) => {
  try {
    const { payee, terms, totalAmount, startDate, endDate } = req.body;

    // Ensure logged-in user is payer
    if (req.user.role !== "payer") {
      return res.status(403).json({ message: "Only payers can create agreements" });
    }

    // Prevent self-agreements
    if (req.user.id === payee) {
      return res.status(400).json({ message: "Payer and payee cannot be the same" });
    }

    const agreement = await Agreement.create({
      payer: req.user.id,
      payee,
      terms,
      totalAmount,
      startDate,
      endDate,
      status: "pending", // new agreements start as pending
    });

    res.status(201).json(agreement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Confirm Agreement (only payee)
export const confirmAgreement = async (req, res) => {
  try {
    const { id } = req.params;
    const agreement = await Agreement.findById(id);

    if (!agreement) return res.status(404).json({ message: "Agreement not found" });

    if (agreement.payee.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the payee can confirm this agreement" });
    }

    if (agreement.status !== "pending") {
      return res.status(400).json({ message: "Agreement is not pending" });
    }

    agreement.status = "active";
    await agreement.save();

    res.json({ message: "Agreement confirmed", agreement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Reject Agreement (only payee)
export const rejectAgreement = async (req, res) => {
  try {
    const { id } = req.params;
    const agreement = await Agreement.findById(id);

    if (!agreement) return res.status(404).json({ message: "Agreement not found" });

    if (agreement.payee.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the payee can reject this agreement" });
    }

    if (agreement.status !== "pending") {
      return res.status(400).json({ message: "Agreement is not pending" });
    }

    agreement.status = "rejected";
    await agreement.save();

    res.json({ message: "Agreement rejected", agreement });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all agreements (payer or payee)
export const getAgreements = async (req, res) => {
  try {
    const agreements = await Agreement.find({
      $or: [{ payer: req.user.id }, { payee: req.user.id }],
    })
      .populate("payer", "name email")
      .populate("payee", "name email");

    res.json(agreements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single agreement + payment progress
// Get single agreement by ID
export const getAgreementById = async (req, res) => {
  try {
    const agreement = await Agreement.findById(req.params.id)
      .populate("payer", "name email")
      .populate("payee", "name email");

    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    // Fetch all confirmed (paid) payments for this agreement
    const payments = await Payment.find({
      agreement: agreement._id,
      status: "paid",
    });

    // Calculate total paid
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    // Calculate progress percentage
    const progress = agreement.totalAmount ? (totalPaid / agreement.totalAmount) * 100 : 0;

    // ✅ Check if completed
    if (totalPaid >= agreement.totalAmount && agreement.status !== "completed") {
      agreement.status = "completed";
      await agreement.save();
    }

    // Send response with extra fields
    res.json({
      ...agreement.toObject(),
      totalPaid,
      progress: Math.min(progress, 100), // cap at 100%
      isCompleted: agreement.status === "completed", // extra field for frontend
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get stats for agreements
export const getAgreementStats = async (req, res) => {
  try {
    const total = await Agreement.countDocuments({
      $or: [{ payer: req.user.id }, { payee: req.user.id }],
    });

    const active = await Agreement.countDocuments({
      $or: [{ payer: req.user.id }, { payee: req.user.id }],
      status: "active",
    });

    const completed = await Agreement.countDocuments({
      $or: [{ payer: req.user.id }, { payee: req.user.id }],
      status: "completed",
    });

    res.json({ total, active, completed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
