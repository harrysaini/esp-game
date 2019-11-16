import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static associate: (models: any) => void;
}
User.init({
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'user'
});


User.associate = (models: any) => {

}

export default User;
