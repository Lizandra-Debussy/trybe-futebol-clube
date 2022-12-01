import { Router } from 'express';
import MatchController from '../controllers/macthes.controller';

const router = Router();

const matcheController = new MatchController();

router.get('/', matcheController.getAll);

export default router;
