import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

class TeamController {
  public getAll = async (_req: Request, res: Response) => {
    const teams = await TeamService.getAllTeams();

    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const teamById = await TeamService.getTeamById(id as unknown as number);

    return res.status(200).json(teamById);
  };
  // ex: onClick={() => setOrdenador(opcao.value as OpcoesOrdenador)}
}

export default TeamController;
