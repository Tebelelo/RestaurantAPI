import {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../models/inventoryModel.js";

//Add a new item
export const createItem = async (req, res) => {
  try {
    const { item_name, quantity, category, price, unit } = req.body;
    const newItem = await addItem(item_name, quantity, category, price, unit);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Failed to add item" });
  }
};

//Get all items
export const fetchItems = async (req, res) => {
  try {
    const items = await getItems();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

//Get an item by ID
export const fetchItemById = async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

//Update an item
export const modifyItem = async (req, res) => {
  try {
    const { item_name, quantity, category, price, unit } = req.body;
    const id = req.params.id;

    const updatedItem = await updateItem(id, item_name, quantity, category, price, unit);
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Failed to update item" });
  }
};

//Delete an item
export const removeItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await deleteItem(id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Failed to delete item" });
  }
};
