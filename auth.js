const { Strategy: FacebookStrategy } = require('passport-facebook');
const passport = require('koa-passport')

const users = {};
passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser((id, done) => {
  console.log(id);
  users[id] ? done(null, users[id]) : done('Not found');
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:' + (process.env.PORT || 1337) + '/auth/facebook/callback',
    scope: ['user_friends'],
    profileFields: ['friends'],
  },
  (token, tokenSecret, profile, done) => {
    const user = { id: profile.id, profile, token, tokenSecret };
    users[profile.id] = user;
    done(null, user);
  }
));
