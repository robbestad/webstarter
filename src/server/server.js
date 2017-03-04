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
const catcher = require('./middleware/catcher');
const config = require('../config/index');
const render = require('./middleware/render');
const context = require('./middleware/context');
import logger from 'debug';
import mount from 'koa-mount';
import serve from 'koa-static'
const curl = require('curlrequest');

const crypto = require('crypto');

const getContent = (phrase) => new Promise(resolve => {
  const hash = crypto.createHash('sha256').update(require('../config/secret.json') + phrase).digest('base64');
  curl.request({
    url: `https://redis.robbestad.no/data/content`,
    headers: {
      accept: 'application/json',
      phrase,
      hash
    },
    pretend: false
  }, function (err, stdout) {
    resolve(stdout);
  })
});

router
  .get('/api/content',
    async ctx => {
      const {phrase} = ctx.headers;
      ctx.body = await new Promise((resolve, reject) => {
        getContent(phrase)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          })
      })
    }
  )
  .get('*', async function (ctx) {
    if ('/' == ctx.path) await send(ctx, root + "index.html");
    if (ctx.path.startsWith("/page/")) await send(ctx, root + "index.html");
    await send(ctx, root + ctx.path);
  });


const app = new koa()
  .use(favicon(path.join(__dirname, root, 'assets/icons/favicon.ico')))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(convert(staticCache(path.join(__dirname, root, 'assets'), {
    maxAge: 365 * 24 * 60 * 60
  })))
  .use(convert(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
  })))
  .use(catcher)
  .use(context);

if (isProd) {
  app
    .use(favicon(config.http.favicon))
    .use(compress({
      filter: (content_type) => {
        return /text/i.test(content_type)
      },
      threshold: 2048,
      flush: require('zlib').Z_SYNC_FLUSH
    }));

  // Serve static files
  Object.keys(config.http.static).forEach(staticURL => {
    logger('app:static')(staticURL);
    app.use(convert(mount(staticURL, convert(serve(config.http.static[staticURL])))))
  });

  app.use(render);

  app.listen(config.http.port, function () {
    logger('app:start')('server.js listening on port ' + config.http.port)
  });

}

module.exports = app;

