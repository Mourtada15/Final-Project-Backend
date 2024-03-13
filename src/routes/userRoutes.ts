import express, { Request, Response } from "express";
import * as userControllers from "../controllers/userControllers";
import { requireAuth } from "../middleware/jwt";

const router = express.Router();

router.post('/register', (req: Request, res: Response) => userControllers.register(req, res));
router.post('/login', (req: Request, res: Response) => userControllers.login(req, res));

router.use(requireAuth);
router.get('/', (req: Request, res: Response) => userControllers.getUsers(req, res));
router.get('/:id', (req: Request<{ id: string }>, res: Response) => userControllers.getUser(req, res));
router.put('/:id', (req: Request<{ id: string }>, res: Response) => userControllers.updateUser(req, res));
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => userControllers.deleteUser(req, res));
router.post('/logout', (req: Request<{ id: string }>, res: Response) => userControllers.logout(req, res))

export default router;