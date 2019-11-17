import { Request, Response } from 'express';
import { SignupRequest, LoginRequest, ILoginResponseObject } from './authOptions';
import { RESPONSE_STATUS, HTTP_STATUS } from '../../utils/Status';
import { GenericResponse, IGenericResponse } from '../../utils/GenericResponse';
import AuthModel from './AuthModel';
import User from '../../models/user.model';

class GameController {

  static async signUp(req: Request, res: Response) {
    try {
      const options = new SignupRequest(req);
      const user: User = await AuthModel.signup(options);
      const response = new GenericResponse<User>(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const options = new LoginRequest(req);
      const user: ILoginResponseObject = await AuthModel.login(options);
      const response = new GenericResponse<ILoginResponseObject>(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = req.user;
      const response = new GenericResponse(RESPONSE_STATUS.SUCCESS, 'Success', user);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }

  static async getUserGames(req: Request, res: Response) {
    try {
      let user = req.user as User;
      const userGames: any = await AuthModel.getUserGames(user);
      const response = new GenericResponse(RESPONSE_STATUS.SUCCESS, 'Success', userGames);
      res.json(response);
    } catch (err) {
      const response = new GenericResponse(RESPONSE_STATUS.FAILED, err.message);
      res.status(HTTP_STATUS.BAD_REQUEST).send(response);
    }
  }


}

export default GameController;
