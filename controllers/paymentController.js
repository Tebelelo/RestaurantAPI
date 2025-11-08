import {
  addPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../models/paymentModel.js";

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { order_id, payment_method, amount, payment_time } = req.body;

    if (!order_id || !payment_method || !amount) {
      return res.status(400).json({ message: "Missing required fields: order_id, payment_method, amount" });
    }

    const newPayment = await addPayment(order_id, payment_method, amount, payment_time);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Failed to create payment" });
  }
};

// Get all payments
export const fetchPayments = async (req, res) => {
  try {
    const payments = await getPayments();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

// Get payment by ID
export const fetchPaymentById = async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);

    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    res.status(500).json({ message: "Failed to fetch payment" });
  }
};

// Update payment
export const modifyPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const { order_id, payment_method, amount, payment_time } = req.body;

    if (!order_id || !payment_method || !amount) {
      return res.status(400).json({ message: "Missing required fields: order_id, payment_method, amount" });
    }

    const updatedPayment = await updatePayment(id, order_id, payment_method, amount, payment_time);

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: "Server error while updating payment." });
  }
};

// Delete payment
export const removePayment = async (req, res) => {
  try {
    const deletedPayment = await deletePayment(req.params.id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully", deletedPayment });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: "Failed to delete payment" });
  }
};
