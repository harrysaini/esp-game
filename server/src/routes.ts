import { Router } from 'express';
import config from 'config';

const apiRouter: Router = Router();

apiRouter.get('/v1/index', (req, res) => {
  res.send('hello from api');
  console.log(JSON.stringify(config));
});



export default apiRouter;
