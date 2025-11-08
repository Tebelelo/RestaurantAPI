import {
  addSpecificOrder,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} from "../models/orderItemsModel.js";

// Add an item to an order
export const createOrderItem = async (req, res) => {
  try {
    const { order_id, item_id, quantity, price } = req.body;
    const newOrderItem = await addSpecificOrder(order_id, item_id, quantity, price);
    res.status(201).json(newOrderItem);
  } catch (error) {
    console.error("Error adding order item:", error);
    res.status(500).json({ message: "Failed to add order item" });
  }
};

// Get all order items
export const fetchOrderItems = async (req, res) => {
  try {
    const orderItems = await getOrderItems();
    res.status(200).json(orderItems);
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ message: "Failed to fetch order items" });
  }
};

// Get an order item by ID
export const fetchOrderItemById = async (req, res) => {
  try {
    const orderItem = await getOrderItemById(req.params.id);
    if (!orderItem) return res.status(404).json({ message: "Order item not found" });
    res.status(200).json(orderItem);
  } catch (error) {
    console.error("Error fetching order item:", error);
    res.status(500).json({ message: "Failed to fetch order item" });
  }
};

// Update an order item
export const modifyOrderItem = async (req, res) => {
  try {
    const { order_id, item_id, quantity, price } = req.body;
    const id = req.params.id;

    const updatedOrderItem = await updateOrderItem(id, order_id, item_id, quantity, price);
    if (!updatedOrderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.status(200).json(updatedOrderItem);
  } catch (error) {
    console.error("Error updating order item:", error);
    res.status(500).json({ message: "Failed to update order item" });
  }
};

// Delete an order item
export const removeOrderItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrderItem = await deleteOrderItem(id);
    if (!deletedOrderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.status(200).json({ message: "Order item deleted successfully", deletedOrderItem });
  } catch (error) {
    console.error("Error deleting order item:", error);
    res.status(500).json({ message: "Failed to delete order item" });
  }
};