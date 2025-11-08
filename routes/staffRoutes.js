import express from "express";
import {
  createStaffMember,
  loginStaffMember,
  fetchStaffMembers,
  fetchStaffMemberById,
  modifyStaffMember,
  removeStaffMember,
} from "../controllers/staffController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginStaffMember);
router.route("/")
  .post(createStaffMember) // Temporarily remove protection to create the first admin
  .get(protect, authorize("admin"), fetchStaffMembers);

router.route("/:id")
  .get(protect, authorize("admin"), fetchStaffMemberById)
  .put(protect, authorize("admin"), modifyStaffMember)
  .delete(protect, authorize("admin"), removeStaffMember);

export default router;