const koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const send = require('koa-send');

const root = process.env.NODE_ENV === "production" ? "static/" : "build/";

const app = new koa()
  .use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
  .use(async function (ctx) {
    if ('/' == ctx.path) await send(ctx, root + "/index.html");
    if (ctx.path.startsWith("/assets")) await send(ctx, ctx.path);
    await send(ctx, root + ctx.path);
  });

module.exports = app;
