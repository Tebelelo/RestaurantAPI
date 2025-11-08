import express from "express";
import {
  createCustomer,
  fetchCustomers,
  fetchCustomerById,
  modifyCustomer,
  removeCustomer,
  loginCustomer,
} from "../controllers/customerController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginCustomer);
router.route("/")
  .post(createCustomer)
  .get(protect, authorize("admin"), fetchCustomers);

router.route("/:id")
  .get(protect, fetchCustomerById) // A customer can fetch their own profile
  .put(protect, modifyCustomer) // A customer can modify their own profile
  .delete(protect, authorize("admin"), removeCustomer);

export default router;