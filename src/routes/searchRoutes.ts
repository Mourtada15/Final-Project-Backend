import express from "express";
import { unifiedSearch } from "../controllers/searchController";

const router = express.Router();

router.get("/", unifiedSearch); // GET /api/search?q=your-query

export default router;
