// models/orderModel.js
import { supabase } from "../config/db.js";

// Add a new order
export const addOrder = async (customer_id, staff_id, total_amount, status) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert({ customer_id, staff_id, total_amount, status })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

// Get all orders
export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_id', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

// Update an order
export const updateOrder = async (id, { customer_id, staff_id, total_amount, status }) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ customer_id, staff_id, total_amount, status })
      .eq('order_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (id) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .delete()
      .eq('order_id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};