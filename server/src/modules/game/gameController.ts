import { Request, Response } from 'express';
import config from 'config';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/Status';
import { GenericResponse, IGenericResponse } from '../../utils/GenericResponse';
import GameModel, { IGameStart } from './gameModel';
import { GameStartRequestOptions, GameAnswerSubmitRequestOptions } from './gameOptions';

class GameController {

  static async startGame(req: Request, res: Response) {
    try {
      const gameOptions = new GameStartRequestOptions(req);
      const game: IGameStart = await GameModel.startGame(gameOptions);
      const response = new GenericResponse<IGameStart>(RESPONSE_STATUS.SUCCESS, 'Success', game);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async submitAnswers(req: Request, res: Response) {
    try {
      const gameOptions = new GameAnswerSubmitRequestOptions(req);
      await GameModel.answerGame(gameOptions);
      const response = new GenericResponse<void>(RESPONSE_STATUS.SUCCESS, 'Success');
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }
}

export default GameController;
