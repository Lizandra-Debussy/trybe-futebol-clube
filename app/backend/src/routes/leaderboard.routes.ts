import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboard = new LeaderboardController();

router.get('/', leaderboard.getAll);
router.get('/away', leaderboard.getAway);
router.get('/home', leaderboard.getHome);

export default router;
