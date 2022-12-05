import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/macthes.controller';

const router = Router();

const matcheController = new MatchController();

router.get('/', matcheController.getAllInProgress);
router.get('/', matcheController.getAll);
router.post('/', authMiddleware, matcheController.createMacthInProgressTrue);

export default router;
