import { Request } from 'express';

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

export class LoginRequest extends SignupRequest{}
