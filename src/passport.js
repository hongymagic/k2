// @flow

import passport from 'koa-passport';
import { Strategy } from 'passport-local';
import User from './models/User';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id }).then(user => done(null, user || null), done);
});

passport.use(
  'local',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        done(null, await user.verify(password) ? user : false);
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
