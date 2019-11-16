import sequelize from '../libs/sequelize';
import Sequelize, { Model } from 'sequelize';
import User from './user.model';
import Task from './task.model';


class Game extends Model {

  isGamePlayedByFirstUser!: boolean;
  isGamePlayedBySecondUser!: boolean'
  points!: number;
  player1!: number;
  player2!: number;
  getTasks!: Sequelize.HasManyGetAssociationsMixin<Task>;

  static associate: (models: any) => void;
}

Game.init({
  isGamePlayedByFirstUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isGamePlayedBySecondUser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
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
  Game.hasMany(models.Task);
}


export default Game;
