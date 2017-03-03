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
const compiler = webpack(config);
const port = 5001;

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

app.use('/api/*', function (req, res) {
  let proxiedUrl = req.baseUrl;
  const url = require('url');
  const url_parts = url.parse(req.url, true);
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

app.use('/page/*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../build/index.html')));
  res.end();
});

app.listen(port, 'localhost', function (err, result) {
  if (err) return logger('webpack:error', err);
  logger('webpack:compiler')(`==> Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser`)
});

module.exports = app;

