"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controllers/searchController");
const router = express_1.default.Router();
router.get("/", searchController_1.unifiedSearch); // GET /api/search?q=your-query
exports.default = router;
