import { ISignupRequest, LoginRequest } from "./authOptions";
import UserDAO from "../../dao/user.dao";

class AuthModel {
  static async signup(options: ISignupRequest) {
    const user = await UserDAO.createUser(options);
    return user;
  }

  static async login(options: LoginRequest) {
    const user = UserDAO.find(options);
    if(!user) {
      throw new Error('Incorrect username or password');
    }

  }
}

export default AuthModel;
