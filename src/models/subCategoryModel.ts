import mongoose, { Schema, Document, ObjectId } from "mongoose";
import Category, { ICategory } from "./categoryModel"

// Interface for SubCategory data
export interface ISubCategory extends Document {
  name: string;
  category: string;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

subCategorySchema.pre("save", async function (next) {
  try {
    // Ensure that category is properly defined and contains the necessary data
    if (!this.category) {
      throw new Error("Category name is required for SubCategory creation");
    }

    // Find the category based on the provided name
    const category: ICategory | null = await Category.findOne({ name: this.category });
    if (!category) {
      throw new Error("Category not found");
    }

    // Ensure that the category object has a subCategories property
    if (!category.subCategories) {
      category.subCategories = [];
    }

    // Check if the current subcategory name is already in the subCategories array
    if (!category.subCategories.includes(this._id)) {
      category.subCategories.push(this._id);
    }

    await category.save();
    next();
  } catch (error: any) {
    next(error);
  }
});


export default mongoose.model<ISubCategory>("SubCategory", subCategorySchema);
