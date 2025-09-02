// controllers/paymentController.js
import Payment from "../models/PaymentModel.js";
import Agreement from "../models/Agreement.js";

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const { agreementId, amount, note } = req.body;

    console.log(req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!agreementId || !amount) {
      return res.status(400).json({ message: "Agreement ID and amount are required" });
    }

    // Populate payer and payee fields when finding the agreement
    const agreement = await Agreement.findById(agreementId).populate("payer payee");
    if (!agreement) {
      return res.status(404).json({ message: "Agreement not found" });
    }

    // The defensive check should now work correctly
    if (!agreement.payer || !req.user.id) {
      return res.status(400).json({ message: "Payer or user ID is missing" });
    }

    // This check will now compare the populated payer's ID
    if (agreement.payer.id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Only payer can create payments" });
    }

    if (agreement.status === "completed") {
      return res.status(400).json({
        message: "This agreement is already completed. No more payments allowed.",
      });
    }

    const paymentData = {
      agreement: agreement._id,
      payer: agreement.payer,
      payee: agreement.payee,
      amount,
      note: note || "",
    };

    if (req.file) {
      paymentData.image = `/uploads/${req.file.filename}`;
    }

    const payment = await Payment.create(paymentData);
    res.status(201).json(payment);

    // After saving payment
    const totalPaid = await Payment.aggregate([
      { $match: { agreement: agreement._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const paidAmount = totalPaid[0]?.total || 0;

    if (paidAmount >= agreement.totalAmount) {
      agreement.status = "completed";
      await agreement.save();
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Server error while creating payment" });
  }
};

// Get Payments for Agreement
export const getPaymentsByAgreement = async (req, res) => {
  try {
    const { agreementId } = req.params;

    const payments = await Payment.find({ agreement: agreementId }).populate(
      "payer payee",
      "name email"
    );

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error while fetching payments" });
  }
};

// Request Confirmation (payer)
export const requestPaymentConfirmation = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.payer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    payment.status = "waiting_confirmation";
    await payment.save();

    res.json(payment);
  } catch (error) {
    console.error("Error requesting confirmation:", error);
    res.status(500).json({ message: "Server error while requesting confirmation" });
  }
};

// Payee confirms payment
export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.payee.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    payment.status = "paid";
    payment.paidAt = Date.now();
    await payment.save();

    res.json(payment);
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ message: "Server error while confirming payment" });
  }
};

// Payee rejects payment
export const rejectPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.payee.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    payment.status = "pending"; // back to pending
    payment.paidAt = null;
    if (note) payment.note = note;

    await payment.save();
    res.json(payment);
  } catch (error) {
    console.error("Error rejecting payment:", error);
    res.status(500).json({ message: "Server error while rejecting payment" });
  }
};

// Mark Payment as Paid (by Payer)
export const markPaymentAsPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.payer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    payment.status = "waiting_confirmation";
    payment.paidAt = Date.now();

    if (note) payment.note = note;
    if (req.file) {
      payment.image = `/uploads/${req.file.filename}`;
    }

    await payment.save();
    res.json(payment);
  } catch (error) {
    console.error("Error marking payment as paid:", error);
    res.status(500).json({ message: "Server error while marking payment as paid" });
  }
};
