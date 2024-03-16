import express, { Request, Response } from "express";
import * as categoryControllers from "../controllers/categoryControllers";
import upload from "../middleware/multer"
import { requireAuth } from "../middleware/jwt";

const router = express.Router();

router.get('/', categoryControllers.getCategories);
router.get('/:id',categoryControllers.getCategory);

router.use(requireAuth);
router.post('/', upload.single('icon'), categoryControllers.createCategory);
router.delete('/:id', categoryControllers.deleteCategory);
router.put('/:id', categoryControllers.updateCategory);

export default router;