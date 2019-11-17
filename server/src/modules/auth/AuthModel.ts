import { ISignupRequest, LoginRequest, ILoginResponseObject } from "./authOptions";
import config from 'config';
import UserDAO from "../../dao/user.dao";
import jwt from 'jsonwebtoken';
import GameDAO from '../../dao/game.dao';
import _ from "lodash";
import User from "../../models/user.model";

const jwtSecret = config.get('jwtSecret') as string;

class AuthModel {
  static async signup(options: ISignupRequest) {
    const user = await UserDAO.createUser(options);
    return user;
  }

  static async login(options: LoginRequest): Promise<ILoginResponseObject> {
    const user = await UserDAO.find(options);
    if(!user) {
      throw new Error('Incorrect username or password');
    }

    const userToken = jwt.sign({id: user.id, username: user.username}, jwtSecret, {expiresIn: '1 days'});

    return {
      user,
      token: userToken
    }
  }

  static async getUserGames(user: User) {
    const games = await GameDAO.findGamesOfUser(user.id);
    user = user.toJSON();
    user = _.extend(user, {games: games})

    return user;
  }
}

export default AuthModel;
