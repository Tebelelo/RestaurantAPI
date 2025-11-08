// models/staffModels.js
import pool from "../config/db.js";

//Add new staff member (password should be pre-hashed)
export const addStaffMember = async (full_name, email, role, hashedPassword) => {
  try {
    const result = await pool.query(
      `INSERT INTO staff (full_name, email, role, password)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [full_name, email, role, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding staff member:", error);
    throw error;
  }
};

//Get all staff members
export const getStaffMembers = async () => {
  try {
    const result = await pool.query("SELECT * FROM staff ORDER BY staff_id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching staff members:", error);
    throw error;
  }
};

//Get a single staff member by ID
export const getStaffMemberById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM staff WHERE staff_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching staff member by ID:", error);
    throw error;
  }
};

//Get a single staff member by email (for login)
export const getStaffMemberByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM staff WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching staff member by email:", error);
    throw error;
  }
};

//Update staff member (password should be pre-hashed)
export const updateStaffMember = async (id, full_name, email, role, hashedPassword) => {
  try {
    const result = await pool.query(
      `UPDATE staff
       SET full_name = $1, email = $2, role = $3, password = $4
       WHERE staff_id = $5
       RETURNING *`,
      [full_name, email, role, hashedPassword, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating staff member:", error);
    throw error;
  }
};

//Delete staff member
export const deleteStaffMember = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM staff WHERE staff_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting staff member:", error);
    throw error;
  }
};
