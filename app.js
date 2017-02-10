const koa = require('koa');
const path = require('path');
const favicon = require('koa-favicon');
const koaStaticPlus = require('koa-static-plus');

const app = new koa()
  .use(koaStaticPlus(path.join(__dirname, 'static'), {}));

module.exports = app;
