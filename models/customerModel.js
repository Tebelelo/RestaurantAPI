// models/customerModel.js
import pool from "../config/db.js";

//Add a new customer
export const addCustomer = async (full_name, email, phone, address, hashedPassword) => {
  try {
    const result = await pool.query(
      `INSERT INTO customers (full_name, email, phone, address, password)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [full_name, email, phone, address, hashedPassword]
    );
    return result.rows[0]; 
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

//Get all customers
export const getCustomers = async () => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY customer_id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

//Get customer by ID
export const getCustomerById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM customers WHERE customer_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

//Get customer by Email
export const getCustomerByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM customers WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    throw error;
  }
};

// Update customer
export const updateCustomer = async (id, full_name, email, phone, address) => {
  try {
    const result = await pool.query(
      `UPDATE customers
       SET full_name = $1, email = $2, phone = $3, address = $4
       WHERE customer_id = $5
       RETURNING *`,
      [full_name, email, phone, address, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

//Delete customer
export const deleteCustomer = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
