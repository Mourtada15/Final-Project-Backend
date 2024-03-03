import express, { Request, Response } from "express";
import * as subCategoryControllers from "../controllers/subCategoryControllers";
import { requireAuth } from "../middleware/jwt";

const router = express.Router();

router.get('/', (req: Request, res: Response) => subCategoryControllers.getSubCategories(req, res));
router.get('/:id', (req: Request, res: Response) => subCategoryControllers.getSubCategory(req, res));

router.use(requireAuth);
router.post('/', (req: Request, res: Response) => subCategoryControllers.createSubCategory(req, res));
router.delete('/:id', (req: Request, res: Response) => subCategoryControllers.deleteSubCategory(req, res));
router.put('/:id', (req: Request, res: Response) => subCategoryControllers.updateSubCategory(req, res));

export default router;