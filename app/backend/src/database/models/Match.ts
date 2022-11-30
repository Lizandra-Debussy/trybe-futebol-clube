import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER(),
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER(),
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER(),
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER(),
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER(),
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
});

export default Match;
