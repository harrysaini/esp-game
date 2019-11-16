import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';
import User from './user.model';

class Game extends Model {
  static associate: (models: any) => void;
}
Game.init({
  player1: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  player2: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'game'
});

Game.associate = (models: any) => {
}


export default Game;
