import { Request, Response } from "express";
import mongoose from "mongoose";
import Product, { IProduct } from "../models/productModel";
import SubCategory from "../models/subCategoryModel"; 

export const getProducts = async (req: Request, res: Response) => {
  try {
    const Products: IProduct[] = await Product.find();
    res.status(200).json(Products);
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
};

export const getProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID." });
  }

  try {
    const product: IProduct | null = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }
    res.status(200).json({ product });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, price, condition, description, subCategoryID } = req.body as {
      title: string
      price: number
      condition: string
      description: string
      subCategoryID: string
    };
    const image = req.file?.path;

    // Check if the subcategory exists
    const subCategory = await SubCategory.findById(subCategoryID);
    if (!subCategory) {
      return res.status(400).json({ error: "Subcategory not found" });
    }

    const newProduct: IProduct = await Product.create({
      title, price, condition, description, image:image, subCategoryID
    });
    
    res.status(200).json({ message: "Product created succefully!" ,data: newProduct});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const updateProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID!" });
  }

  try {
    const updateProduct: IProduct | null = await Product.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found!" })
    }
    res.status(200).json({ message: "Product updated successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid product ID!" });
  }

  try {
    const deleteProduct: IProduct | null = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};