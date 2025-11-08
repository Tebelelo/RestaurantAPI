import express from "express";
import {
  createItem,
  fetchItems,
  fetchItemById,
  modifyItem,
  removeItem,
} from "../controllers/inventoryController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(fetchItems)
  .post(protect, authorize("admin", "manager"), createItem);

router.route("/:id")
  .get(fetchItemById)
  .put(protect, authorize("admin", "manager"), modifyItem)
  .delete(protect, authorize("admin", "manager"), removeItem);

export default router;