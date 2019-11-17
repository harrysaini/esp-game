import Game  from '../models/game.model';
import Sequelize, { Op } from 'sequelize';

export interface IGameObject {
  player1: number
}

class GameDAO {
  static async findHalfPlayedGame(userId: number) {
    const game = await Game.findOne({
      where: {
        isGamePlayedByFirstUser: true,
        player1: {
          [Op.not]: userId
        },
        player2: {
          [Op.is]: null
        }
      }
    });
    return game;
  }


  static async createNew(gameObj: IGameObject) {
    const game = await Game.create(gameObj);
    return game;
  }

  static async getGameById(gameId: number) {
    const game = await Game.findByPk(gameId);
    if(!game) {
      throw new Error('gameid not present');
    }
    return game;
  }

  static async findGamesOfUser(userId: number) {
    const games = await Game.findAll({
      where: {
        [Op.or]: [{player1: userId}, {player2: userId}]
      }
    });

    return games;
  }
}

export default GameDAO;
