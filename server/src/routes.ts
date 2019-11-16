import { Router } from 'express';
import config from 'config';
import GameController from './modules/game/gameController';
import AuthController from './modules/auth/AuthController';

const apiRouter: Router = Router();

apiRouter.get('/v1/index', (req, res) => {
  res.send('hello from api');
  console.log(JSON.stringify(config));
});

apiRouter.post('/v1/auth/signup', AuthController.signUp);

apiRouter.post('/v1/game/start', GameController.startGame);
apiRouter.post('/v1/game/answer', GameController.submitAnswers);


export default apiRouter;
