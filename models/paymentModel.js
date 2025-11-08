// models/paymentModel.js
import pool from "../config/db.js";

// 🟢 Add a new payment
export const addPayment = async (order_id, payment_method, amount, payment_time) => {
  try {
    const result = await pool.query(
      `INSERT INTO payments (order_id, payment_method, amount, payment_time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, payment_method, amount, payment_time]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
};

// 🟣 Get all payments
export const getPayments = async () => {
  try {
    const result = await pool.query("SELECT * FROM payments ORDER BY payment_id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

// 🔵 Get payment by ID
export const getPaymentById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM payments WHERE payment_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    throw error;
  }
};

// 🟠 Update payment
export const updatePayment = async (id, order_id, payment_method, amount, payment_time) => {
  try {
    const result = await pool.query(
      `UPDATE payments
       SET order_id = $1, payment_method = $2, amount = $3, payment_time = $4
       WHERE payment_id = $5
       RETURNING *`,
      [order_id, payment_method, amount, payment_time, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};

// 🔴 Delete payment
export const deletePayment = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM payments WHERE payment_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
};
