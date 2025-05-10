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
exports.unifiedSearch = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const subCategoryModel_1 = __importDefault(require("../models/subCategoryModel"));
const unifiedSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (!query)
        return res.status(400).json({ message: "No query provided" });
    try {
        const [products, categories, subcategories] = yield Promise.all([
            productModel_1.default.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } }),
            categoryModel_1.default.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } }),
            subCategoryModel_1.default.find({ $text: { $search: query } }).sort({ score: { $meta: "textScore" } }),
        ]);
        res.status(200).json({ products, categories, subcategories });
    }
    catch (err) {
        res.status(500).json({ message: "Search failed", error: err });
    }
});
exports.unifiedSearch = unifiedSearch;
