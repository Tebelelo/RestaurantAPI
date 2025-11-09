// models/orderItemsModel.js
import { supabase } from "../config/db.js";

//Add a specific order item
export const addSpecificOrder = async (order_id, item_id, quantity, price) => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .insert({ order_id, item_id, quantity, price })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding order item:", error);
    throw error;
  }
};

// Get all order items
export const getOrderItems = async () => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .order('order_item_id', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
};

//Get order item by ID
export const getOrderItemById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_item_id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching order item by ID:", error);
    throw error;
  }
};

// Update order item
export const updateOrderItem = async (id, { order_id, item_id, quantity, price }) => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .update({ order_id, item_id, quantity, price })
      .eq('order_item_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating order item:", error);
    throw error;
  }
};

//Delete order item
export const deleteOrderItem = async (id) => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .delete()
      .eq('order_item_id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting order item:", error);
    throw error;
  }
};
