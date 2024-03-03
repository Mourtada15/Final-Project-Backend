import { Request, Response } from "express";
import mongoose from "mongoose";
import SubCategory, { ISubCategory } from "../models/subCategoryModel";
import Category, { ICategory } from "../models/categoryModel";

export const getSubCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const subCategories: ISubCategory[] = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such subCategory!' });
    }

    const subCategory: ISubCategory | null = await SubCategory.findById(id);

    if (!subCategory) {
      return res.status(404).json({ error: 'No such subCategory!' });
    }

    res.status(200).json({ subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSubCategory = async (req: Request, res: Response) => {
  const { name, category } = req.body as { name: string, category: string };

  try {

    // Check if the category exists
    const existingCategory: ICategory | null = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if a subcategory with the same name already exists in the category
    const existingSubCategory: ISubCategory | null = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.status(400).json({ message: 'SubCategory already exists for this category' });
    }

    // Create the new subcategory
    const subCategory: ISubCategory = await SubCategory.create({ name, category });

    res.status(200).json(subCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such subCategory' });
    }

    const subCategory: ISubCategory | null = await SubCategory.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

    if (!subCategory) {
      return res.status(404).json({ error: 'No such subCategory' });
    }

    res.status(200).json({ message: 'SubCategory updated successfully', subCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Invalid subCategory ID' });
    }

    const category: ICategory | null = await Category.findOne({ subCategories: id });
    if (!category) {
      return res.status(404).json({ error: 'Category not found for the subCategory' });
    }

    category.subCategories = category.subCategories.filter(subCat => subCat.toString() !== id);
    await category.save();

    const subCategory: ISubCategory | null = await SubCategory.findByIdAndDelete(id);
    if (!subCategory) {
      return res.status(404).json({ error: 'SubCategory not found' });
    }

    res.status(200).json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
