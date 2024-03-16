import { Request, Response } from "express";
import mongoose from "mongoose";
import Category, { ICategory } from "../models/categoryModel";

// Interface for Category response
interface ICategoryResponse {
  message?: string;
  category?: ICategory;
  error?: string;
}

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories: ICategory[] = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// Get specific category
export const getCategory = async (req: Request<{ id: string }>, res: Response<ICategoryResponse>) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID." });
  }

  try {
    const category: ICategory | null = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({ category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body as { name: string }; 
  const icon = req.file?.path;

  try {
    const newCategory: ICategory = await Category.create({ name, icon });
    res.status(200).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
export const deleteCategory = async (req: Request<{ id: string }>, res: Response<ICategoryResponse>) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID." });
  }

  try {
    const deletedCategory: ICategory | null = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid category ID." });
  }

  try {
    const updatedCategory: ICategory | null = await Category.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.status(200).json({ message: "Category updated successfully", updatedCategory });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
