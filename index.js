require('dotenv').config()
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');

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

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
