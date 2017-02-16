const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const logger = require('debug');
const sources = (location) => path.join(__dirname, './src', location);

const {
  CommonChunksPlugin,
  HMRPlugin,
  NamedModulesPlugin,
  WebpackPlugin,
  CopyPlugin,
  ExtractPlugin,
  BabelRule,
  CSSRule
} = require('./webpack.plugins');


module.exports = {
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    CommonChunksPlugin,
    HMRPlugin,
    NamedModulesPlugin,
    WebpackPlugin,
    CopyPlugin,
    ExtractPlugin
  ],
  module: {
    rules: [
      BabelRule,
      CSSRule
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'core': path.join(__dirname, './')
    }
  }
};
