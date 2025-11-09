// models/staffModels.js
import { supabase } from "../config/db.js";

//Add new staff member (password should be pre-hashed)
export const addStaffMember = async (full_name, email, role, hashedPassword) => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .insert({
        full_name,
        email,
        role,
        password: hashedPassword,
      })
      .select('*')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding staff member:", error);
    throw error;
  }
};

//Get all staff members
export const getStaffMembers = async () => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('staff_id', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching staff members:", error);
    throw error;
  }
};

//Get a single staff member by ID
export const getStaffMemberById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('staff_id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching staff member by ID:", error);
    throw error;
  }
};

//Get a single staff member by email (for login)
export const getStaffMemberByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching staff member by email:", error);
    throw error;
  }
};

//Update staff member
export const updateStaffMember = async (id, { full_name, email, role, password }) => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .update({ full_name, email, role, password })
      .eq('staff_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating staff member:", error);
    throw error;
  }
};

//Delete staff member
export const deleteStaffMember = async (id) => {
  try {
    const { data, error } = await supabase
      .from('staff')
      .delete()
      .eq('staff_id', id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error deleting staff member:", error);
    throw error;
  }
};
