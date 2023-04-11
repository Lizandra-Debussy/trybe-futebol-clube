import ILeaderboard from '../interfaces/leaderboard.interface';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

type UtilsType = 'all' | 'home' | 'away';

class LeaderboardUtils {
  // retorna o resultado final da operação:
  public static generator(teams: Team[], matches: Match[], type: UtilsType) {
    const result: ILeaderboard[] = [];
    teams.forEach((team) => {
      const teamMatches = this.partidasDoTime(team, matches);
      const teamList = this.teamList(team, teamMatches, type);
      result.push(teamList);
    });
    return this.listSorter(result);
  }

  // retorna as partidas do time de dentro do forEach
  private static partidasDoTime(team: Team, matches: Match[]) {
    return matches.filter((m) => m.dataValues.homeTeam === team.dataValues.id
      || m.dataValues.awayTeam === team.dataValues.id);
  }

  private static totalGames(team: Team, teamMatches: Match[], type: UtilsType) {
    let games = 0;
    if (type === 'all') return teamMatches.length;
    if (type === 'away') {
      teamMatches.forEach((m) => {
        if (m.dataValues.awayTeam === team.dataValues.id) {
          games += 1;
        }
      });
      return games;
    }
    if (type === 'home') {
      teamMatches.forEach((m) => {
        if (m.dataValues.homeTeam === team.dataValues.id) {
          games += 1;
        }
      });
      return games;
    } return 0;
  }

  private static totalVictories(team: Team, teamMatches: Match[], type: UtilsType) {
    const homeVictories = teamMatches.filter((m) => {
      if (m.dataValues.homeTeam === team.dataValues.id) {
        return m.dataValues.homeTeamGoals > m.dataValues.awayTeamGoals;
      } return null;
    });

    const awayVictories = teamMatches.filter((m) => {
      if (m.dataValues.awayTeam === team.dataValues.id) {
        return m.dataValues.homeTeamGoals < m.dataValues.awayTeamGoals;
      } return null;
    });

    if (type === 'all') return homeVictories.length + awayVictories.length;
    if (type === 'away') return awayVictories.length;

    return homeVictories.length;
  }

  private static totalDraws(team: Team, teamMatches: Match[], type: UtilsType) {
    return this.totalGames(team, teamMatches, type) - (this.totalVictories(team, teamMatches, type)
    + this.totalLosses(team, teamMatches, type));
  }

  private static totalLosses(team: Team, teamMatches: Match[], type: UtilsType) {
    const homeLosses = teamMatches.filter((m) => {
      if (m.dataValues.homeTeam === team.dataValues.id) {
        return m.dataValues.homeTeamGoals < m.dataValues.awayTeamGoals;
      } return null;
    });

    const awayLosses = teamMatches.filter((m) => {
      if (m.dataValues.awayTeam === team.dataValues.id) {
        return m.dataValues.homeTeamGoals > m.dataValues.awayTeamGoals;
      } return null;
    });

    if (type === 'all') return homeLosses.length + awayLosses.length;
    if (type === 'away') return awayLosses.length;
    return homeLosses.length;
  }

  private static totalPoints(team: Team, teamMatches: Match[], type: UtilsType) {
    const totalWins = this.totalVictories(team, teamMatches, type);
    const totalDraws = this.totalDraws(team, teamMatches, type);
    return (totalWins * 3) + totalDraws;
  }

  private static goalsFavor(team: Team, teamMatches: Match[], type: UtilsType) {
    const goals: number[] = [];
    teamMatches.filter((m) => {
      if (m.dataValues.homeTeam === team.dataValues.id && (type === 'all' || type === 'home')) {
        goals.push(m.dataValues.homeTeamGoals);
      } return null;
    });

    teamMatches.filter((m) => {
      if (m.dataValues.awayTeam === team.dataValues.id && (type === 'all' || type === 'away')) {
        goals.push(m.dataValues.awayTeamGoals);
      } return null;
    });

    return goals.reduce((acc, val) => acc + val, 0);
  }

  private static goalsOwn(team: Team, teamMatches: Match[], type: UtilsType) {
    const goals: number[] = [];
    teamMatches.filter((m) => {
      if (m.dataValues.homeTeam === team.dataValues.id && (type === 'all' || type === 'home')) {
        goals.push(m.dataValues.awayTeamGoals);
      } return null;
    });

    teamMatches.filter((m) => {
      if (m.dataValues.awayTeam === team.dataValues.id && (type === 'all' || type === 'away')) {
        goals.push(m.dataValues.homeTeamGoals);
      } return null;
    });

    return goals.reduce((acc, val) => acc + val, 0);
  }

  private static goalsBalance(team: Team, teamMatches: Match[], type: UtilsType) {
    const goalsFavor = this.goalsFavor(team, teamMatches, type);
    const goalsOwn = this.goalsOwn(team, teamMatches, type);
    return goalsFavor - goalsOwn;
  }

  private static efficiency(team: Team, teamMatches: Match[], type: UtilsType) {
    const totalPoints = this.totalPoints(team, teamMatches, type);
    return parseFloat(((totalPoints / (this.totalGames(team, teamMatches, type) * 3))
    * 100).toFixed(2));
  }

  private static teamList(team: Team, teamMatches: Match[], type: UtilsType) {
    return {
      name: team.dataValues.teamName,
      totalPoints: this.totalPoints(team, teamMatches, type),
      totalGames: this.totalGames(team, teamMatches, type),
      totalVictories: this.totalVictories(team, teamMatches, type),
      totalDraws: this.totalDraws(team, teamMatches, type),
      totalLosses: this.totalLosses(team, teamMatches, type),
      goalsFavor: this.goalsFavor(team, teamMatches, type),
      goalsOwn: this.goalsOwn(team, teamMatches, type),
      goalsBalance: this.goalsBalance(team, teamMatches, type),
      efficiency: this.efficiency(team, teamMatches, type),
    };
  }

  private static listSorter(teamLists: ILeaderboard[]) {
    const result = teamLists.sort((a, b) => {
      if (b.totalPoints === a.totalPoints) {
        if (b.totalVictories === a.totalVictories) {
          if (b.goalsBalance === a.goalsBalance) {
            if (b.goalsFavor === a.goalsFavor) {
              return a.goalsOwn - b.goalsOwn;
            } return (b.goalsFavor - a.goalsFavor);
          } return b.goalsBalance - a.goalsBalance;
        } return b.totalVictories - a.totalVictories;
      } return b.totalPoints - a.totalPoints;
    });
    return result;
  }
}

export default LeaderboardUtils;
