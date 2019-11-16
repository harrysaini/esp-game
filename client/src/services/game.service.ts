import { config } from '../config';
import { each } from 'lodash';

const startUrl = config.apiUrl + '/api/v1/game/start';
const answerUrl = config.apiUrl + '/api/v1/game/answer';
const headers = {
  "Content-type": "application/json"
}

interface Answers {
  [key: number]: {
    [key: number]: boolean
  }
}

class GameService {

  static async startNewGame(userId: number) {
    try {
      const resp = await fetch(startUrl, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          userId: userId
        })
      });
      const response = await resp.json();
      if (response.status.code !== 0) {
        alert(response.status.message);
        throw new Error(response.status.message);
      }
      return response.data;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }


  private static parseAnswers(answers: Answers){
    const parsedAnswers: any[] = [];
    each(answers, (selectedImages, taskId) => {
      const selectedAnswers: string[] = [];
      each(selectedImages, (value, imageId) => {
        if(value) {
          selectedAnswers.push(imageId);
        }
      });
      parsedAnswers.push({
        taskId,
        selectedImages: selectedAnswers
      });
    });
    return parsedAnswers;
  }

  static async submitAnswers(userId: number, gameId: number, answers: Answers ) {
    console.log(answers);
    try {
      const resp = await fetch(answerUrl, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          userId: userId,
          gameId: gameId,
          answers: GameService.parseAnswers(answers)
        })
      });
      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }
      return response.data;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }
}

export default GameService;
