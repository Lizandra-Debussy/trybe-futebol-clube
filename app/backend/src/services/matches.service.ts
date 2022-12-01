import Team from '../database/models/Team';
import Match from '../database/models/Match';

class MatchService {
  public static async getAllMatches() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}

export default MatchService;
