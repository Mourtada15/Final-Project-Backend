"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.createSubCategory = exports.getSubCategory = exports.getSubCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subCategoryModel_1 = __importDefault(require("../models/subCategoryModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const getSubCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subCategories = yield subCategoryModel_1.default.find();
        res.status(200).json(subCategories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getSubCategories = getSubCategories;
const getSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such subCategory!' });
        }
        const subCategory = yield subCategoryModel_1.default.findById(id);
        if (!subCategory) {
            return res.status(404).json({ error: 'No such subCategory!' });
        }
        res.status(200).json({ subCategory });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getSubCategory = getSubCategory;
const createSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category } = req.body;
    try {
        // Check if the category exists
        const existingCategory = yield categoryModel_1.default.findOne({ name: category });
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        // Check if a subcategory with the same name already exists in the category
        const existingSubCategory = yield subCategoryModel_1.default.findOne({ name });
        if (existingSubCategory) {
            return res.status(400).json({ message: 'SubCategory already exists for this category' });
        }
        // Create the new subcategory
        const subCategory = yield subCategoryModel_1.default.create({ name, category });
        res.status(200).json(subCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createSubCategory = createSubCategory;
const updateSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such subCategory' });
        }
        const subCategory = yield subCategoryModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body), { new: true });
        if (!subCategory) {
            return res.status(404).json({ error: 'No such subCategory' });
        }
        res.status(200).json({ message: 'SubCategory updated successfully', subCategory });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateSubCategory = updateSubCategory;
const deleteSubCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid subCategory ID' });
        }
        const category = yield categoryModel_1.default.findOne({ subCategories: id });
        if (!category) {
            return res.status(404).json({ error: 'Category not found for the subCategory' });
        }
        category.subCategories = category.subCategories.filter(subCat => subCat.toString() !== id);
        yield category.save();
        const subCategory = yield subCategoryModel_1.default.findByIdAndDelete(id);
        if (!subCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        res.status(200).json({ message: 'SubCategory deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteSubCategory = deleteSubCategory;
