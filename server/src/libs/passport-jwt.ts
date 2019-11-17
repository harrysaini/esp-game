import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'config';
import passport from 'passport';
import User from '../models/user.model';

const jwtSecret = config.get('jwtSecret') as string;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(new Strategy(opts, async (payload, done) => {
  console.log(payload);
  try {
    const user = await User.findByPk(payload.id);
    if(!user){
      return done(null);
    } else {
      return done(null, user);
    }
  } catch (err) {
    done(err);
  }
}))
