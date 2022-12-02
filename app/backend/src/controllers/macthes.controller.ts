import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  public getAll = async (_req: Request, res: Response) => {
    const matches = await MatchService.getAllMatches();

    return res.status(200).json(matches);
  };

  public getAllInProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matchesInP = await MatchService.getMatchesInProgress(inProgress as string);

    return res.status(200).json(matchesInP);
  };
}

export default MatchController;
