import express from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPayment,
  getPaymentsByAgreement,
  markPaymentAsPaid,
  requestPaymentConfirmation,
  confirmPayment,
  rejectPayment,
} from "../controllers/paymentController.js";
import { fileURLToPath } from "url";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // save inside /server/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
// Create a payment (payer only, with optional image)
router.post("/", protect, upload.single("image"), createPayment);

// Mark payment as paid (payer can also upload proof image)
router.put("/:id/paid", protect, upload.single("image"), markPaymentAsPaid);

router.put("/:id/request-confirmation", protect, requestPaymentConfirmation);
router.put("/:id/confirm", protect, confirmPayment);
router.put("/:id/reject", protect, rejectPayment);

router.get("/:agreementId", protect, getPaymentsByAgreement);

export default router;
