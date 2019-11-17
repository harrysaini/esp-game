import { Router } from 'express';
import config from 'config';
import GameController from './modules/game/gameController';
import AuthController from './modules/auth/AuthController';
import passport from 'passport';

const apiRouter: Router = Router();

apiRouter.get('/v1/index', (req, res) => {
  res.send('hello from api');
  console.log(JSON.stringify(config));
});

apiRouter.post('/v1/auth/signup', AuthController.signUp);
apiRouter.post('/v1/auth/login', AuthController.login);
apiRouter.get('/v1/auth/me', passport.authenticate('jwt', {session: false}),  AuthController.getUser);

apiRouter.get('/v1/user/games', passport.authenticate('jwt', {session: false}),  AuthController.getUserGames);

apiRouter.post('/v1/game/start', passport.authenticate('jwt', {session: false}), GameController.startGame);
apiRouter.post('/v1/game/answer', passport.authenticate('jwt', {session: false}), GameController.submitAnswers);


export default apiRouter;
