import { Request, Response } from 'express';
import IMateches from '../interfaces/matches.interface';
import MatchService from '../services/matches.service';

class MatchController {
  public getAll = async (req: Request, res: Response) => {
    const matches = await MatchService.getAllMatches();

    const { inProgress } = req.query;
    console.log(inProgress);

    if (inProgress) {
      const matchesInP = await MatchService.getMatchesInProgress(inProgress as string);

      return res.status(200).json(matchesInP);
    } return res.status(200).json(matches);
  };

  public createMacthInProgressTrue = async (req: Request, res: Response) => {
    const match = req.body;
    const matchCreated = await MatchService.createMacthInProgressTrue(match);

    return res.status(201).json(matchCreated);
  };

  public updateMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    // const { inProgress } = req.body;
    const updateMatch = await MatchService.updateMatchInProgress(id as unknown as IMateches);

    if (updateMatch) return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchController;
