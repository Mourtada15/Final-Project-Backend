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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("../models/productModel"));
const subCategoryModel_1 = __importDefault(require("../models/subCategoryModel"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield productModel_1.default.find();
        res.status(200).json(Products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID." });
    }
    try {
        const product = yield productModel_1.default.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found!" });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, price, condition, description, subCategoryID } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        // Check if the subcategory exists
        const subCategory = yield subCategoryModel_1.default.findById(subCategoryID);
        if (!subCategory) {
            return res.status(400).json({ error: "Subcategory not found" });
        }
        const newProduct = yield productModel_1.default.create({
            title, price, condition, description, image: image, subCategoryID
        });
        res.status(200).json({ message: "Product created succefully!", data: newProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID!" });
    }
    try {
        const updateProduct = yield productModel_1.default.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!updateProduct) {
            return res.status(404).json({ error: "Product not found!" });
        }
        res.status(200).json({ message: "Product updated successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid product ID!" });
    }
    try {
        const deleteProduct = yield productModel_1.default.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ error: "Product not found." });
        }
        res.status(200).json({ message: "Product deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
