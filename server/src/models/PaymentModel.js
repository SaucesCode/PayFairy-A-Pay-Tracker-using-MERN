import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    agreement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agreement",
      required: true,
    },
    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "waiting_confirmation", "paid"],
      default: "pending",
    },
    paidAt: {
      type: Date,
    },
    // new fields
    image: {
      type: String, // store file path e.g. "/uploads/payment123.jpg"
    },
    note: {
      type: String, // optional note from payer
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
