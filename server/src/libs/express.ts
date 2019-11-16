import express, { NextFunction, Request, Response, Router } from 'express';
import * as path from 'path';
import apiRouter from '../routes';
import cors from 'cors';

const app: express.Application = express();

app.use(cors());

const port: string | number  = process.env.PORT || '3000';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

export default app;
