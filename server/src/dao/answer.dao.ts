import Answer from '../models/answer.model';
import Sequelize, { Op } from 'sequelize';
import { IGameAnswer } from '../modules/game/gameOptions';
import _ from 'lodash';



class AnswerDAO {

  static async addBulkAnswers(userId: number ,answers: IGameAnswer[]) {
    const answerSavePromises = _.map(answers, async (answer) => {
      const selectedImages = answer.selectedImages;
      const answersObjs = await Promise.all(_.map(selectedImages, async (selectedImageId) => {
        const answerObj = Answer.create({
          taskId: answer.taskId,
          imageId: selectedImageId,
          userId: userId
        });
        return answerObj;
      }));

      return {
        taskId: answer.taskId,
        answers: answersObjs
      }
    });

    const tasksAnswers = Promise.all(answerSavePromises);
    return tasksAnswers;
  }

  static async findAll(query: Sequelize.FindOptions) {
    return await Answer.findAll(query);
  }

}

export default AnswerDAO;
