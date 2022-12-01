import ITeams from './teams.interface';

interface IMateches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: ITeams,
  teamAway?: ITeams,
}

export default IMateches;
