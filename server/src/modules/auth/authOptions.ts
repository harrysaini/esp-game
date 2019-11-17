import { Request } from 'express';
import User from '../../models/user.model';

export interface ISignupRequest {
  username: string;
  password: string;
}

export class SignupRequest implements ISignupRequest {
  username: string;
  password: string;

  constructor(req: Request) {
    this.username = req.body.username;
    this.password = req.body.password;

    if(!this.username) {
      throw new Error('username not present');
    }
    if(!this.password) {
      throw new Error('password not present');
    }
  }
}

export interface ILoginResponseObject{
  user: User;
  token: string;
}

export class LoginRequest extends SignupRequest{}
