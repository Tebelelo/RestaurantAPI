// models/inventoryModel.js
import pool from "../config/db.js";

//Add new item
export const addItem = async (item_name, quantity, category, price, unit) => {
  try {
    const result = await pool.query(
      `INSERT INTO inventory (item_name, quantity, category, price, unit)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [item_name, quantity, category, price, unit]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

//Get all items
export const getItems = async () => {
  try {
    const result = await pool.query("SELECT * FROM inventory ORDER BY item_id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

//Get item by ID
export const getItemById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE item_id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw error;
  }
};

//Update item
export const updateItem = async (id, item_name, quantity, category, price, unit) => {
  try {
    const result = await pool.query(
      `UPDATE inventory
       SET item_name = $1, quantity = $2, category = $3, price = $4, unit = $5
       WHERE item_id = $6
       RETURNING *`,
      [item_name, quantity, category, price, unit, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

//Delete item
export const deleteItem = async (id) => {
  try {
    const result = await pool.query("DELETE FROM inventory WHERE item_id = $1 RETURNING *", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
