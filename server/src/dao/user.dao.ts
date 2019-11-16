import User  from '../models/user.model';
import _ from 'lodash';
import { ISignupRequest, LoginRequest } from '../modules/auth/authOptions';


class UserDAO {
  static async addPointsToUsers(users: number[], points: number) {
    return await Promise.all(_.map(users, async (userId) => {
      const user = await User.increment('points', {
        by: points,
        where: {
          id: userId
        }
      });
    }));
  }

  static async createUser(userObj: ISignupRequest) {
    try{
      const user = await User.create({
        username: userObj.username,
        password: userObj.password
      });
      return user;
    } catch(err) {
      if(err.name === 'SequelizeUniqueConstraintError'){
        throw new Error(err.errors[0].message);
      } else {
        throw err;
      }
    }
  }

  static async find(userObj: LoginRequest) {
    const user = await User.findAll({
      where: {
        username: userObj.username,
        password: userObj.password
      }
    });

    return user;
  }
}

export default UserDAO;
