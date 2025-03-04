import express, { Request, Response } from "express";
import * as productControllers from "../controllers/productControllers"
import upload from "../middleware/multer"
// import { requireAuth } from "../middleware/jwt";

const router = express.Router();

router.get('/', productControllers.getProducts);
router.get('/:id', productControllers.getProduct);

// router.use(requireAuth);
router.post('/', upload.single('image'), productControllers.createProduct);
router.put('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);

export default router;