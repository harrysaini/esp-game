import { IGameStartRequestOptions, TASKS_GAME, GameAnswerSubmitRequestOptions, IGameAnswer } from './gameOptions';
import GameDAO, { IGameObject } from "../../dao/game.dao";
import ImageDAO from '../../dao/image.dao';
import Game from "../../models/game.model";
import _ from "lodash";
import TaskDAO from '../../dao/task.dao';
import Task from '../../models/task.model';
import AnswerDAO from '../../dao/answer.dao';
import { areArrayEqual } from '../../utils/helpers';
import UserDAO from '../../dao/user.dao';


export interface IGameStart extends Game {
  tasks: Task[];
}
class GameModel {
  static async startGame(options: IGameStartRequestOptions) {
    // Algo
    // if
    // find any pending game not played by same user
    // send tasks

    // else
    // start new game
    // get 5 random images
    // create tasks
    // send tasks

    const halfPlayedGame = await GameDAO.findHalfPlayedGame(options.userId);
    let gameStartObj: IGameStart;

    if (halfPlayedGame && halfPlayedGame !== null) {
      gameStartObj = await GameModel.startHalfPlayedGame(options, halfPlayedGame);
    } else {
      gameStartObj = await GameModel.createNewGame(options);
    }


    return gameStartObj;

  }

  private static async addImagesToTasks(tasks: Task[]) {
    const tasksPArr = _.map(tasks, async (task) => {
      const image = await ImageDAO.getImageWithSecondaryImages(task.imageId);

      task = task.toJSON() as Task;
      return _.extend(task, {
        image: image
      });
    })

    const tasksWithImages = await Promise.all(tasksPArr);
    return tasksWithImages;
  }

  private static async createNewGame(options: IGameStartRequestOptions) {
    const gameObj: IGameObject = {
      player1: options.userId
    };
    const game = await GameDAO.createNew(gameObj);
    const images = await ImageDAO.getAllImages();
    const shuffledImages = _.sampleSize(images, TASKS_GAME);
    const tasks = await TaskDAO.createTasks(options.userId, game, shuffledImages);
    const gameJSON: IGameStart = _.extend(game.toJSON(), {
      tasks: await GameModel.addImagesToTasks(tasks)
    }) as IGameStart;
    return gameJSON;
  }

  private static async startHalfPlayedGame(options: IGameStartRequestOptions, halfPlayedGame: Game) {
    await halfPlayedGame.update({
      player2: options.userId
    });
    const tasks = await halfPlayedGame.getTasks();
    const gameJSON: IGameStart = _.extend(halfPlayedGame.toJSON(), {
      tasks: await GameModel.addImagesToTasks(tasks)
    }) as IGameStart;
    return gameJSON;
  }

  static validateAnswerArray(answers: IGameAnswer[], tasks: Task[]) {
    const gameTasks: any = {};
    _.each(tasks, (task) => {
      gameTasks[task.id] = 1;
    });
    _.each(answers, (answer) => {
      if(!gameTasks[answer.taskId]) {
        throw new Error('task is not of this game');
      }
    });
  }

  static async answerGame(options: GameAnswerSubmitRequestOptions) {
    //Algo
    // if first player
    // save all answers
    // update game object

    // else
    // save all answers
    // calculate result
    const game = await GameDAO.getGameById(options.gameId);
    const tasks = await game.getTasks();

    //validate if answer belongs correctly to game tasks only
    GameModel.validateAnswerArray(options.answers, tasks);

    if (!(options.userId === game.player1 || options.userId === game.player2)) {
      throw new Error('not your game');
    }

    if (game.player1 === options.userId) {
      if (game.isGamePlayedByFirstUser === true) {
        throw new Error('Game already played by user');
      }
      await AnswerDAO.addBulkAnswers(options.userId, options.answers);
      await game.update({
        isGamePlayedByFirstUser: true
      });
      return;
    } else {
      if (game.isGamePlayedBySecondUser === true) {
        throw new Error('Game already played by user');
      }
      await AnswerDAO.addBulkAnswers(options.userId, options.answers);
      await GameModel.calculateScore(game, tasks);
      return;
    }

  }


  private static async getGameAnswers(game: Game, tasks: Task[]) {
    const playerOne = game.player1;
    const playerTwo = game.player2;

    const answers = await Promise.all(_.map(tasks, async (task) => {

      const firstPlayerAnswersPromise = AnswerDAO.findAll({
        where: {
          taskId: task.id,
          userId: playerOne
        }
      });

      const secondPlayerAnswersPromise = AnswerDAO.findAll({
        where: {
          taskId: task.id,
          userId: playerTwo
        }
      });

      const [firstPlayerAnswers, secondPlayerAnswers] = await Promise.all([firstPlayerAnswersPromise, secondPlayerAnswersPromise]);

      return {
        taskId: task.id,
        firstPlayerAnswers,
        secondPlayerAnswers
      }

    }));
    return answers;
  }

  private static async calculateScore(game: Game, tasks: Task[]) {
    const gameAnswers = await GameModel.getGameAnswers(game, tasks);
    let points = 0;

    _.each(gameAnswers, (gameAnswer) => {
      const firstAnswers = _.map(gameAnswer.firstPlayerAnswers, (answer) => {
        return answer.imageId;
      });
      const secondAnswers = _.map(gameAnswer.secondPlayerAnswers, (answer) => {
        return answer.imageId;
      });
      if (areArrayEqual(firstAnswers, secondAnswers)) {
        points = points + 1;
      }
    });

    const gamePointsUpdatePromise = game.update({
      points: points,
      isGamePlayedBySecondUser: true
    });

    const userPointsUpdatePromise = UserDAO.addPointsToUsers([game.player1, game.player2], points);

    await Promise.all([gamePointsUpdatePromise, userPointsUpdatePromise]);

    return;

  }


}


export default GameModel;
