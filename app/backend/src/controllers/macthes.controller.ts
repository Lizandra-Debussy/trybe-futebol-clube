import { Request, Response } from 'express';
import IMateches from '../interfaces/matches.interface';
import MatchService from '../services/matches.service';

class MatchController {
  public getAll = async (req: Request, res: Response) => {
    const matches = await MatchService.getAllMatches();

    const { inProgress } = req.query;

    if (inProgress) {
      const matchesInP = await MatchService.getMatchesInProgress(inProgress as string);

      return res.status(200).json(matchesInP);
    } return res.status(200).json(matches);
  };

  public createMacthInProgressTrue = async (req: Request, res: Response) => {
    const match = req.body;
    const matchCreated = await MatchService.createMacthInProgressTrue(match);
    // console.log(matchCreated);

    if (match.homeTeam === match.awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!matchCreated) {
      return res.status(422).json({ message: 'There is no team with such id!' });
    }

    return res.status(201).json(matchCreated);
  };

  public updateMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateMatch = await MatchService.updateMatchInProgress(id as unknown as IMateches);

    if (updateMatch) return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    const matchUpdate = await MatchService.updateMatch(id as unknown as IMateches, body);
    if (matchUpdate) return res.status(200).json({ message: 'Updated!' });
  };
}

export default MatchController;
