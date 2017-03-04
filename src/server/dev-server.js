'use strict';
const path = require('path');

const webpack = require('webpack');
const express = require("express");
const httpProxy = require("http-proxy");
const config = require('../../core/webpack.config.dev.js');
const logger = require('debug');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const apiProxy = httpProxy.createProxyServer();
//---------------------------------
const curl = require('curlrequest');
const compiler = webpack(config);
const port = 5001;
const bodyParser = require('body-parser');
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

const saveContent = (phrase, data) => new Promise(resolve => {
  const hash = crypto.createHash('sha256').update(require('../config/secret.json') + phrase).digest('base64');
  curl.request({
    method: "PUT",
    url: "https://redis.robbestad.no/data",
    headers: {
      accept: 'application/json',
      phrase,
      hash
    },
    data: JSON.stringify(data),
    pretend: false,
    timeout: 10
  }, function (err, stdout) {
    resolve(stdout);
    if (err) reject(err);
  })
});

const app = express();

// Start a webpack-dev-server
const middleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
  },
  hot: true,
  compress: false,
  historyApiFallback: false,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 500
  },
  noInfo: true,
  stats: {colors: true}
});

app.use(middleware);

app.use(webpackHotMiddleware(compiler));

app.get('/api/content', (req, res) => {
  const {phrase} = req.headers;
  res.set('Content-Type', 'application/json');
  getContent(phrase).then(res.send.bind(res));
});
app.put('/api/content', bodyParser.json(), (req, res) => {
  const {phrase} = req.headers;
  res.set('Content-Type', 'application/json');
  saveContent(phrase, req.body).then(res.send.bind(res));
});

app.use('/page/*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../build/index.html')));
  res.end();
});

app.listen(port, 'localhost', function (err, result) {
  if (err) return logger('webpack:error', err);
  logger('webpack:compiler')(`==> Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser`)
});

module.exports = app;

