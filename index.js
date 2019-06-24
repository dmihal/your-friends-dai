require('dotenv').config()
const fetch = require('node-fetch');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const users = require('./users');

const router = new Router();

const app = new Koa();
const PORT = process.env.PORT || 1337;

require('./auth')
app.keys = ['your-session-secret'];
app.use(session({}, app));

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());

router.get('/', ctx => {
  ctx.body = {value: 'Hello world'};
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/fail'
  })
);
router.get('/status', ctx => {
  ctx.body = {
    authenticated: ctx.isAuthenticated(),
  };
});

router.get('/success', ctx => {
  ctx.body = {
    success: true,
  };
});

router.get('/fail', ctx => {
  ctx.body = {
    success: false,
  };
});

router.get('/friends', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = { error: 'Not authenticated' };
    return;
  }

  console.log(ctx.state.user);
  const response = await fetch(`https://graph.facebook.com/me?fields=friends.limit(100)&access_token=${ctx.state.user.token}`);
  const json = await response.json();
  const friends = json.friends.data.map(friend => {
    const user = users.getUser(friend.id);
    if (user) {
      friend.address = user.address;
    }
    return friend;
  });
  ctx.body = {
    friends,
  };
});

router.post('/set_address', ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = { error: 'Not authenticated' };
    return;
  }

  const { address } = ctx.request.body;
  users.setAddress(ctx.state.user.id, address);
  ctx.body = { success: true };
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
