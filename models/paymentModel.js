// models/paymentModel.js
import { supabase } from "../config/db.js";

// Add a new payment
export const addPayment = async (order_id, amount, payment_method, status) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({ order_id, amount, payment_method, status })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
};

// Get all payments
export const getPayments = async () => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_id', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

// Get payment by ID
export const getPaymentById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('payment_id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    throw error;
  }
};

// Update a payment
export const updatePayment = async (id, { order_id, amount, payment_method, status }) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({ order_id, amount, payment_method, status })
      .eq('payment_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};

// Delete a payment
export const deletePayment = async (id) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .delete()
      .eq('payment_id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
};