import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  public getAll = async (_req: Request, res: Response) => {
    const leaderboardHomeTeam = await LeaderboardService.retrieveAllLeaderboard();
    return res.status(200).json(leaderboardHomeTeam);
  };

  public getAway = async (_req: Request, res: Response) => {
    const leaderboardHomeTeam = await LeaderboardService.retrieveAllAway();
    return res.status(200).json(leaderboardHomeTeam);
  };

  public getHome = async (_req: Request, res: Response) => {
    const leaderboardHomeTeam = await LeaderboardService.retrieveAllHome();
    return res.status(200).json(leaderboardHomeTeam);
  };
}

export default LeaderboardController;
