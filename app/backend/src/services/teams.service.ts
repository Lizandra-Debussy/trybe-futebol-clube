import Team from '../database/models/Team';

class TeamService {
  public static getAllTeams() {
    const teams = Team.findAll();
    return teams;
  }

  public static getTeamById(id: number) {
    const teamById = Team.findOne({ where: { id } });
    return teamById;
  }
}

export default TeamService;
