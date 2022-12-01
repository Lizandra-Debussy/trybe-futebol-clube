import { Request, Response } from 'express';
import MatchService from '../services/matches.service';

class MatchController {
  public getAll = async (_req: Request, res: Response) => {
    const matches = await MatchService.getAllMatches();

    return res.status(200).json(matches);
  };
}

export default MatchController;
