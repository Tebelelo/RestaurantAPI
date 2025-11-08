import express from "express";
import {
  createOrder,
  fetchOrders,
  fetchOrderById,
  modifyOrder,
  removeOrder,
} from "../controllers/orderController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, authorize("admin", "staff"), fetchOrders)
  .post(protect, createOrder); // A customer or staff can create an order

router.route("/:id")
  .get(protect, fetchOrderById) // Customer can see their order, staff can see any
  .put(protect, authorize("admin", "staff"), modifyOrder)
  .delete(protect, authorize("admin"), removeOrder);

export default router;