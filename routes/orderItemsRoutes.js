import express from "express";
import {
  createOrderItem,
  fetchOrderItems,
  fetchOrderItemById,
  modifyOrderItem,
  removeOrderItem,
} from "../controllers/orderItemsController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, authorize("admin", "staff"), fetchOrderItems)
  .post(protect, createOrderItem);

router.route("/:id")
  .get(protect, fetchOrderItemById)
  .put(protect, authorize("admin", "staff"), modifyOrderItem)
  .delete(protect, authorize("admin", "staff"), removeOrderItem);

export default router;