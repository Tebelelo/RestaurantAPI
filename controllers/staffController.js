import {
  addStaffMember,
  getStaffMembers,
  getStaffMemberById,
  getStaffMemberByEmail,
  updateStaffMember,
  deleteStaffMember,
} from "../models/staffModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create new staff member
export const createStaffMember = async (req, res) => {
  try {
    const { full_name, email, role, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = await addStaffMember(full_name, email, role, hashedPassword);
    res.status(201).json(staff);
  } catch (error) {
    console.error("Error creating staff member:", error);
    res.status(500).json({ message: "Failed to create staff member" });
  }
};

// Login staff member
export const loginStaffMember = async (req, res) => {
  try {
    const { email, password } = req.body;

    const staff = await getStaffMemberByEmail(email);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    const match = await bcrypt.compare(password, staff.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: staff.staff_id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Don't send the password back to the client
    const { password: _, ...staffInfo } = staff;

    res.json({ message: "Login successful", staff: staffInfo, token });
  } catch (error) {
    console.error("Error logging in staff member:", error);
    res.status(500).json({ message: "Failed to log in" });
  }
};

// Get all staff members
export const fetchStaffMembers = async (req, res) => {
  try {
    const staff = await getStaffMembers();
    res.status(200).json(staff);
  } catch (error) {
    console.error("Error fetching staff members:", error);
    res.status(500).json({ message: "Failed to fetch staff members" });
  }
};

// Get staff member by ID
export const fetchStaffMemberById = async (req, res) => {
  try {
    const staff = await getStaffMemberById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff member not found" });
    res.status(200).json(staff);
  } catch (error) {
    console.error("Error fetching staff member:", error);
    res.status(500).json({ message: "Failed to fetch staff member" });
  }
};

// Update staff member
export const modifyStaffMember = async (req, res) => {
  try {
    const id = req.params.id;
    const { full_name, email, role } = req.body;

    // To prevent accidentally wiping the password, we fetch the existing staff member.
    const existingStaff = await getStaffMemberById(id);
    if (!existingStaff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Note: Password updates should be handled in a separate, dedicated endpoint for security.
    const staff = await updateStaffMember(id, full_name, email, role, existingStaff.password);
    if (!staff) return res.status(404).json({ message: "Staff member not found" });
    res.status(200).json(staff);
  } catch (error) {
    console.error("Error updating staff member:", error);
    res.status(500).json({ message: "Failed to update staff member" });
  }
};

// Delete staff member
export const removeStaffMember = async (req, res) => {
  try {
    const staff = await deleteStaffMember(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff member not found" });
    res.status(200).json({ message: "Staff member deleted successfully", staff });
  } catch (error) {
    console.error("Error deleting staff member:", error);
    res.status(500).json({ message: "Failed to delete staff member" });
  }
};