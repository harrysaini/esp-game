import { Request } from 'express';
import _ from 'lodash';

export const TASKS_GAME = 5;


export interface IGameStartRequestOptions {
  userId: number;
}


export class GameStartRequestOptions implements IGameStartRequestOptions {
  userId: number;

  constructor(req: Request) {
    this.userId = req.body && req.body.userId;

    if(!this.userId) {
      throw new Error('userid undefined');
    }
  }
}

export interface IGameAnswer {
  taskId: number;
  selectedImages: number[]
}

export interface IGameAnswerSubmitRequestOptions {
  userId: number;
  gameId: number;
  answers: IGameAnswer[];
}

export class GameAnswerSubmitRequestOptions implements IGameAnswerSubmitRequestOptions {
  userId: number;
  gameId: number;
  answers: IGameAnswer[];

  constructor(req: Request) {
    this.userId = req.body.userId;
    this.gameId = req.body.gameId;
    this.answers = req.body.answers;

    if(_.isUndefined(this.userId)) {
      throw new Error('userid missing');
    }

    if(_.isUndefined(this.gameId)) {
      throw new Error('userid missing');
    }

    if(_.isUndefined(this.answers) || !_.isArray(this.answers) || this.answers.length > TASKS_GAME) {
      throw new Error('asnswer array invalid');
    }

    _.each(this.answers, (answer, index) => {
      if(_.isUndefined(answer.taskId)) {
        throw new Error(`asnswer array invalid, taskId missing at ${index}`);
      }

      if(_.isUndefined(answer.selectedImages) || !_.isArray(this.answers)) {
        throw new Error(`asnswer array invalid, selectedImages missing at ${index}`);
      }
    });
  }
}
