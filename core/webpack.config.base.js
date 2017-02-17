const isProd = process.env.NODE_ENV === "production";
const path = require('path');

const {
  CommonChunksPlugin,
  HMRPlugin,
  NamedModulesPlugin,
  WebpackPlugin,
  CopyPlugin,
  ExtractPlugin,
  ServiceWorkerPrecachePlugin,
  BabelRule,
  CSSRule
} = require(path.join(__dirname, 'webpack.plugins'));

module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', isProd ? 'static': 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    CommonChunksPlugin,
    HMRPlugin,
    NamedModulesPlugin,
    WebpackPlugin,
    CopyPlugin,
    ExtractPlugin,
    ServiceWorkerPrecachePlugin
  ],
  module: {
    rules: [
      BabelRule,
      CSSRule
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //   'core': path.join(__dirname, '..', 'core')
    // }
  }
};
