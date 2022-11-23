import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER(),
  },
  teamName: {
    type: STRING(),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  tableName: 'teams',
  timestamps: false,
});

export default Team;
