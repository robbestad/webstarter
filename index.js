const koa = require('koa');
const http = require('http');
const app = require('./app');

http.createServer(app.callback()).listen(process.env.PORT || 1997);
