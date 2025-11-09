// models/inventoryModel.js
import { supabase } from "../config/db.js";

//Add new item
export const addItem = async (item_name, quantity, category, price, unit) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .insert({ item_name, quantity, category, price, unit })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

//Get all items
export const getItems = async () => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('item_id', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

//Get item by ID
export const getItemById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('item_id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw error;
  }
};

//Update item
export const updateItem = async (id, { item_name, quantity, category, price, unit }) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .update({ item_name, quantity, category, price, unit })
      .eq('item_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

//Delete item
export const deleteItem = async (id) => {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .delete()
      .eq('item_id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
