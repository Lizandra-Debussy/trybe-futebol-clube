import Match from '../database/models/Match';
import Team from '../database/models/Team';
import LeaderboardUtils from '../utils/leaderboard.utils';

class LeaderboardService {
  public static async retrieveAllLeaderboard() {
    const teams = await Team.findAll();

    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [{ association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['inProgress'],
      } });
    const result = await LeaderboardUtils.generator(teams, matches, 'all');
    return result;
  }

  public static async retrieveAllAway() {
    const teams = await Team.findAll();

    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [{ association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['inProgress'],
      } });
    const result = await LeaderboardUtils.generator(teams, matches, 'away');
    return result;
  }

  public static async retrieveAllHome() {
    const teams = await Team.findAll();

    const matches = await Match.findAll({
      where: { inProgress: false },
      include: [{ association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['inProgress'],
      } });
    const result = await LeaderboardUtils.generator(teams, matches, 'home');
    return result;
  }
}

export default LeaderboardService;
