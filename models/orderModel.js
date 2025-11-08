// models/orderModel.js
import pool from "../config/db.js";

//Create a new order (total_amount is handled by DB trigger)
export const createOrder = async (customer_id, staff_id, status, order_time) => {
  try {
    const result = await pool.query(
      `INSERT INTO orders (customer_id, staff_id, status, order_time)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [customer_id, staff_id, status, order_time]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

//Get all orders
export const getOrders = async () => {
  try {
    const result = await pool.query("SELECT * FROM orders ORDER BY order_id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

//Get order by ID
export const getOrderById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM orders WHERE order_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

//Update an order (total_amount is handled by DB trigger)
export const updateOrder = async (id, customer_id, staff_id, status, order_time) => {
  try {
    const result = await pool.query(
      `UPDATE orders
       SET customer_id = $1,
           staff_id = $2,
           status = $3,
           order_time = $4
       WHERE order_id = $5
       RETURNING *`,
      [customer_id, staff_id, status, order_time, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

//Delete an order
export const deleteOrder = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM orders WHERE order_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};
