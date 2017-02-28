const path = require('path');
const webpack = require('webpack');
const config = require(path.join(__dirname, 'webpack.config.base.js'));
const logger = require('debug');
const nodeExternals = require('webpack-node-externals')

Object.assign(config, {
  cache: true,
  devtool: "source-map",
  // target: 'node',
  // externals: [nodeExternals({
  //   whitelist: ['webpack/hot/poll?1000']
  // })],
  performance: {
    hints: false
  },
  entry: [
    // 'webpack-dev-server/client?http://localhost:5002',
    // 'webpack/hot/only-dev-server',
    'webpack/hot/poll?1000',
    './src/entry.js'
  ],
  output: {
    filename: '[name]-[hash:8].js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  }
});

config.plugins.push(new webpack.HotModuleReplacementPlugin());

logger('webpack:compiler')('Running on port ' + process.env.PORT);

module.exports = config;
