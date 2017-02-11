const koa = require('koa');
const convert = require('koa-convert');
const path = require('path');
const favicon = require('koa-favicon');
const koaStaticPlus = require('koa-static-plus');

const app = new koa()
  .use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
  .use(convert(koaStaticPlus(path.join(__dirname, 'static'), {})));

module.exports = app;
