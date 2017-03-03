const path = require('path');
const webpack = require('webpack');
const config = require(path.join(__dirname, 'webpack.config.base.js'));
const logger = require('debug');

Object.assign(config, {
  cache: true,
  devtool: "source-map",
  performance: {
    hints: false
  },
  entry: [
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?reload=true',
    './src/entry.js'
  ],
  output: {
    filename: '[name]-[hash:8].js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  }
});

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin([
    'NODE_ENV',
    'development'
  ])
);

module.exports = config;
