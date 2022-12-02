import ITeams from '../interfaces/teams.interface';
import Team from '../database/models/Team';

class TeamService {
  public static async getAllTeams(): Promise<ITeams[]> {
    const teams = await Team.findAll();
    return teams;
  }

  public static async getTeamById(id: number): Promise<ITeams | null> {
    const teamById = await Team.findByPk(id);
    return teamById;
  }
}

export default TeamService;
