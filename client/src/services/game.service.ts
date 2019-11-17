import { config } from '../config';
import { each } from 'lodash';
import { AuthService } from './auth.service';

const startUrl = config.apiUrl + '/api/v1/game/start';
const answerUrl = config.apiUrl + '/api/v1/game/answer';
const userGamesUrl = config.apiUrl + '/api/v1/user/games';

const headers = {
  ...AuthService.getAuthHeaders(),
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
      if ([401, 403].indexOf(resp.status) !== -1) {
        AuthService.logout();
      }
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
      if ([401, 403].indexOf(resp.status) !== -1) {
        AuthService.logout();
      }
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


  static async getUserGames() {
    try {
      const resp = await fetch(userGamesUrl, {
        method: 'get',
        headers: AuthService.getAuthHeaders()
      });

      const response = await resp.json();
      if (response.status.code !== 0) {
        throw new Error(response.status.message);
      }

      const user =  response.data;
      return user;
    } catch (e) {
      alert(e.message);
      throw e;
    }
  }
}

export default GameService;
