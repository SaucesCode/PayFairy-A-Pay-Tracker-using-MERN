import express from "express";
import {
  createAgreement,
  confirmAgreement,
  rejectAgreement,
  getAgreements,
  getAgreementById,
  getAgreementStats,
} from "../controllers/agreementController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// must be logged in to create agreements
router.post("/", protect, createAgreement);
router.put("/:id/confirm", protect, confirmAgreement);
router.put("/:id/reject", protect, rejectAgreement);

// get all agreements
router.get("/", protect, getAgreements);
router.get("/stats", protect, getAgreementStats);

// get single agreement
router.get("/:id", protect, getAgreementById);

export default router;
