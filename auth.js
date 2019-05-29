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
    callbackURL: 'http://localhost:' + (process.env.PORT || 1337) + '/auth/facebook/callback'
  },
  (token, tokenSecret, profile, done) => {
    users[profile.id] = profile
    done(null, profile);
  }
));
