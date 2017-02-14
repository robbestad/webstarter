const koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const send = require('koa-send');
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const upload = require('./upload');
const root = process.env.NODE_ENV === "production" ? "static/" : "build/";

router
  .post('/upload', async(ctx, next) => await upload(ctx.request.body).then(result => ctx.body = result))
  .get('*', async function (ctx) {
    if ('/' == ctx.path) await send(ctx, root + "/index.html");
    if (ctx.path.startsWith("/assets")) await send(ctx, ctx.path);
    if (ctx.path.endsWith("/identify")) await send(ctx, root + "/index.html");
    if (ctx.path.endsWith("/camera")) await send(ctx, root + "/index.html");
    await send(ctx, root + ctx.path);
  });

const app = new koa()
  .use(bodyParser({
    formLimit: '16mb'
  }))
  .use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
