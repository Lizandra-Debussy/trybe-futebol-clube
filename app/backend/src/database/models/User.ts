import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  userName!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER(),
  },
  userName: {
    type: STRING(),
  },
  role: {
    type: STRING(),
  },
  email: {
    type: STRING(),
  },
  password: {
    allowNull: false,
    type: STRING(),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  tableName: 'users',
  timestamps: false,
});

export default User;
