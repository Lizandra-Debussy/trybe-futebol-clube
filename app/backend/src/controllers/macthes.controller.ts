import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  public getAll = async (_req: Request, res: Response) => {
    const matches = await MatchService.getAllMatches();

    return res.status(200).json(matches);
  };

  public getAllInProgress = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const matchesInP = await MatchService.getMatchesInProgress(inProgress as string);

      return res.status(200).json(matchesInP);
    }
  };

  public createMacthInProgressTrue = async (req: Request, res: Response) => {
    const match = req.body;
    const matchCreated = await MatchService.createMacthInProgressTrue(match);

    return res.status(201).json(matchCreated);
  };
}

export default MatchController;
