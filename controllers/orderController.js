import {
  addOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from "../models/orderModel.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customer_id, staff_id, status, order_time } = req.body;

    // Basic validation
    if (!customer_id || !staff_id) {
      return res.status(400).json({ message: "Missing required fields: customer_id, staff_id" });
    }

    const newOrder = await addOrder(customer_id, staff_id, status, order_time);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ message: "Failed to add order" });
  }
};

//Get all orders
export const fetchOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Get a single order by ID
export const fetchOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// Update an existing order
export const modifyOrder = async (req, res) => {
  try {
    const { customer_id, staff_id, status, order_time } = req.body;
    const id = req.params.id;

    const updatedOrder = await updateOrder(id, customer_id, staff_id, status, order_time);
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

// Delete an order
export const removeOrder = async (req, res) => {
  try {
    const deletedOrder = await deleteOrder(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
