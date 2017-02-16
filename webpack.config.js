const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/* Common/DEV plugins *************************/

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const hmrPlugin = new webpack.HotModuleReplacementPlugin();

let commonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: ({resource}) => /node_modules/.test(resource),
});

const webpackPlugin = new HtmlWebpackPlugin({
  title: 'Web Starter',
  template: 'views/index.ejs',
});

const copyPlugin = new CopyWebpackPlugin([
  {from: 'common', to: ''}
]);

const extractPlugin = new ExtractTextPlugin("styles.css");

/* Production plugins *************************/

const envPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

commonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
  filename: 'commons.[chunkhash:8].js',
  children: true,
  async: true,
  minChunks: 2
});

const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
});

const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
  },
  output: {
    comments: false,
  }
});

/* RULES *************************/

const babelRule = isProd ? {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'stage-0'],
      plugins: ['inferno', 'transform-decorators-legacy']
    }
  } : {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'stage-0'],
      plugins: ['inferno', 'transform-decorators-legacy']
    }
  };

const CSSRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: 'css-loader?importLoaders=1!postcss-loader'
  })
};


/* CONFIG DEV *************************/

const config = {
  entry: {
    app: './src/entry.js',
  },
  devtool: "source-map",
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    commonChunksPlugin,
    hmrPlugin,
    webpackPlugin,
    copyPlugin,
    extractPlugin
  ],
  module: {},
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

config.module = {
  rules: [
    babelRule,
    CSSRule
  ]
};

/* CONFIG PROD *************************/

if (isProd) {
  config.output.path = path.join(__dirname, './static');
  config.devtool = "none";
  config.plugins.push(
    envPlugin,
    commonChunksPlugin,
    loaderOptionsPlugin,
    uglifyJsPlugin
  );
}

module.exports = config;
