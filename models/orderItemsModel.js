// models/orderItemsModel.js
import pool from "../config/db.js";

//Add a specific order item
export const addSpecificOrder = async (order_id, item_id, quantity, price) => {
  try {
    const result = await pool.query(
      `INSERT INTO order_items (order_id, item_id, quantity, price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, item_id, quantity, price]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding order item:", error);
    throw error;
  }
};

// 🟣 Get all order items
export const getOrderItems = async () => {
  try {
    const result = await pool.query("SELECT * FROM order_items ORDER BY order_item_id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
};

//Get order item by ID
export const getOrderItemById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM order_items WHERE order_item_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching order item by ID:", error);
    throw error;
  }
};

// 🟠 Update order item
export const updateOrderItem = async (id, order_id, item_id, quantity, price) => {
  try {
    const result = await pool.query(
      `UPDATE order_items
       SET order_id = $1, item_id = $2, quantity = $3, price = $4
       WHERE order_item_id = $5
       RETURNING *`,
      [order_id, item_id, quantity, price, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating order item:", error);
    throw error;
  }
};

// Delete order item
export const deleteOrderItem = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM order_items WHERE order_item_id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting order item:", error);
    throw error;
  }
};
