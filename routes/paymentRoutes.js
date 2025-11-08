import express from "express";
import {
  createPayment,
  fetchPayments,
  fetchPaymentById,
  modifyPayment,
  removePayment,
} from "../controllers/paymentController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, authorize("admin"), fetchPayments)
  .post(protect, createPayment);

router.route("/:id")
  .get(protect, fetchPaymentById)
  .put(protect, authorize("admin"), modifyPayment)
  .delete(protect, authorize("admin"), removePayment);

export default router;