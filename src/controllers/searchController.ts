import { Request, Response } from "express";
import productModel from "../models/productModel";
import categoryModel from "../models/categoryModel";
import subCategoryModel from "../models/subCategoryModel";

export const unifiedSearch = async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) return res.status(400).json({ message: "No query provided" });

  try {
    const [products, categories, subcategories] = await Promise.all([
      productModel.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } }),
      categoryModel.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } }),
      subCategoryModel.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } }),
    ]);

    res.status(200).json({ products, categories, subcategories });
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err });
  }
};
