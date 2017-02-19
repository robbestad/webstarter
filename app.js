'use strict';
const koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const send = require('koa-send');
const isProd = process.env.NODE_ENV === "production";
const root = isProd ? "static/" : "build/";
require('colors');
const Router = require('koa-router');
const router = new Router();
const convert = require('koa-convert');
const staticCache = require('koa-static-cache');
const bodyParser = require('koa-better-body');
const compress = require('koa-compress');
const catcher = require('./src/server/middleware/catcher');
const config = require('./src/config/index');

router
  .get('*', async function (ctx) {
    if ('/' == ctx.path) await send(ctx, root + "index.html");
    if (ctx.path.endsWith("/sub")) await send(ctx, root + "index.html");
    await send(ctx, root + ctx.path);
  });

const app = new koa()
  .use(favicon(path.join(__dirname, root, 'assets/icons/favicon.ico')))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(staticCache(path.join(__dirname, root, 'assets'), {
    maxAge: 365 * 24 * 60 * 60
  }))
  .use(convert(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
  })))
  .use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  }))
  .use(catcher);

if (!isProd) {

// Run DEV server for hot-reloading
  const WebpackDevServer = require('webpack-dev-server');
  const webpack = require('webpack');
  const config = require('./core/webpack.config.dev.js');
  const logger = require('debug');
//---------------------------------
  const compiler = webpack(config);
  const port = 5002;

  new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    hot: false,
    compress: false,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 500
    },
    stats: {
      colors: true,
      hash: false,
      timings: false,
      version: false,
      chunks: false,
      modules: false,
      children: false,
      chunkModules: false
    }
  }).listen(port, 'localhost', function (err, result) {
    if (err) return logger('webpack:error', err);

    logger('webpack:compiler')('Running on port ' + port)
  });


}

module.exports = app;

