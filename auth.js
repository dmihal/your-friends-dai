const { Strategy: FacebookStrategy } = require('passport-facebook');
const passport = require('koa-passport');
const users = require('./users');

passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser(async (id, done) => {
  const user = await users.getUser(id);
  user ? done(null, user) : done(new Error('User not found'));
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://localhost:' + (process.env.PORT || 1337) + '/auth/facebook/callback',
    scope: ['user_friends'],
    profileFields: ['displayName', 'picture'],
  },
  (token, tokenSecret, profile, done) => {
    const picture = (profile.photos && profile.photos.length > 0 && profile.photos[0].value) || null;
    const user = {
      id: profile.id,
      name: profile.displayName,
      picture,
      token,
    };
    console.log(user);
    users.addUser(user);
    done(null, user);
  },
));
