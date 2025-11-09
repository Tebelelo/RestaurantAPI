// models/customerModel.js
import { supabase } from "../config/db.js";

//Add a new customer
export const addCustomer = async (full_name, email, phone, address, hashedPassword) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        full_name,
        email,
        phone,
        address,
        password: hashedPassword,
      })
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
};

//Get all customers
export const getCustomers = async () => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('customer_id', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

//Get customer by ID
export const getCustomerById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('customer_id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

//Get customer by Email
export const getCustomerByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    throw error;
  }
};

// Update a customer
export const updateCustomer = async (id, { full_name, email, phone, address }) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({ full_name, email, phone, address })
      .eq('customer_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

//Delete customer
export const deleteCustomer = async (id) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .delete()
      .eq('customer_id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
