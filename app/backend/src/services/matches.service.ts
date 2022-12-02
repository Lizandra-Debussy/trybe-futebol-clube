import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMateches from '../interfaces/matches.interface';

class MatchService {
  public static async getAllMatches(): Promise<IMateches[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async getMatchesInProgress(inProgress: string): Promise<IMateches[]> {
    if (inProgress === 'true') {
      const matches2 = await Match.findAll({
        where: { inProgress: true },
        include: [
          { model: Team, as: 'teamHome' },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
      });
      return matches2;
    }

    const matches3 = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return matches3;
  }
}

export default MatchService;
