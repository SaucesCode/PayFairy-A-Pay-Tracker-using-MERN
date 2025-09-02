import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema(
  {
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
    terms: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected", "active", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Agreement = mongoose.model("Agreement", agreementSchema);
export default Agreement;
