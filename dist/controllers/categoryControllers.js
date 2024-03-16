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
exports.updateCategory = exports.deleteCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
// Get all categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryModel_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCategories = getCategories;
// Get specific category
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid category ID." });
    }
    try {
        const category = yield categoryModel_1.default.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }
        res.status(200).json({ category });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getCategory = getCategory;
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    const icon = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const newCategory = yield categoryModel_1.default.create({ name, icon });
        res.status(200).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCategory = createCategory;
// Delete a category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid category ID." });
    }
    try {
        const deletedCategory = yield categoryModel_1.default.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found." });
        }
        res.status(200).json({ message: "Category deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteCategory = deleteCategory;
// Update a category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid category ID." });
    }
    try {
        const updatedCategory = yield categoryModel_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found." });
        }
        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateCategory = updateCategory;
