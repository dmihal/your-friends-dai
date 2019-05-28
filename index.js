const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(router.routes());

router.get('/', ctx => {
  ctx.body = {value: 'Hello world'};
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
