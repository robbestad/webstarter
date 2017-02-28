'use strict';
const path = require('path');

// Run DEV server for hot-reloading
const webpack = require('webpack');
const express = require("express");
const httpProxy = require("http-proxy");
const config = require('./core/webpack.config.dev.js');
const logger = require('debug');
var app = express();
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var apiProxy = httpProxy.createProxyServer();
//---------------------------------
const compiler = webpack(config);
const port = 5001;

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
  stats: { colors: true }
});

app.use(middleware);

// Enables HMR
app.use(webpackHotMiddleware(compiler));

// Proxy api requests
app.use('/api/*', function (req, res) {
  var proxiedUrl = req.baseUrl;
  var url = require('url');
  var url_parts = url.parse(req.url, true);
  if (url_parts.search !== null) {
    proxiedUrl += url_parts.search;
  }
  req.url = proxiedUrl;
  apiProxy.web(req, res, {
    target: {
      port: 22338,
      host: "localhost"
    }
  });
});

app.use('/pages/*', (req, res)=> {
  // res.sendFile(path.join(__dirname, 'build/index.html'));
  // app.use('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
  res.end();
  // });
});


app.listen(port, 'localhost', function (err, result) {
  if (err) return logger('webpack:error', err);
  logger('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  // logger('webpack:compiler')('Running on port ' + port)
});

module.exports = app;

