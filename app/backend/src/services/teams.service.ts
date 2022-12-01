import Team from '../database/models/Team';

class TeamService {
  public static async getAllTeams() {
    const teams = await Team.findAll();
    return teams;
  }

  public static async getTeamById(id: number) {
    const teamById = await Team.findOne({ where: { id } });
    return teamById;
  }
}

export default TeamService;
