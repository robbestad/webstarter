const webpack = require('webpack');
const path = require('path');
const config = require(path.join(__dirname, 'webpack.config.base.js'));
const logger = require('debug');
Object.assign(config, {
  cache: true,
  devtool: "source-map",
  performance: {
    hints: false
  },
  entry: [
    'webpack-dev-server/client?http://localhost:5002',
    'webpack/hot/only-dev-server',
    './src/entry.js'
  ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  }
});
logger('webpack:compiler')('Running on port ' + process.env.PORT);

module.exports = config;
