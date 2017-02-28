const path = require('path');
const webpack = require('webpack');
const config = require(path.join(__dirname, 'webpack.config.base.js'));
const logger = require('debug');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

Object.assign(config, {
  cache: true,
  devtool: "source-map",
  performance: {
    hints: false
  },
  watch: true,
  target: 'node',
  entry: [
    // 'webpack-dev-server/client?http://localhost:5002',
    // 'webpack/hot/only-dev-server',
    'webpack/hot/poll?1000',
    './src/entry.js'
  ],
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],
  output: {
    // filename: '[name]-[hash:8].js',
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
    filename: 'server.js'
  }
});

config.plugins.push(
  new StartServerPlugin('server.js'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      "BUILD_TARGET": JSON.stringify('server')
    }
  })
);

logger('webpack:compiler')('Running on port ' + process.env.PORT);

module.exports = config;
