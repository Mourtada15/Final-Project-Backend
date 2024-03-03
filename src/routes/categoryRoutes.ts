import express, { Request, Response } from "express";
import * as categoryControllers from "../controllers/categoryControllers";
import { requireAuth } from "../middleware/jwt";

const router = express.Router();

router.get('/', (req: Request, res: Response) => categoryControllers.getCategories(req, res));
router.get('/:id', (req: Request<{ id: string }>, res: Response) => categoryControllers.getCategory(req, res));

router.use(requireAuth);
router.post('/', (req: Request, res: Response) => categoryControllers.createCategory(req, res));
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => categoryControllers.deleteCategory(req, res));
router.put('/:id', (req: Request<{ id: string }>, res: Response) => categoryControllers.updateCategory(req, res));

export default router;