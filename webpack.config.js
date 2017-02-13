const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//   const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
//   filename: '[name].[chunkhash].js',
//   path: './build',
//   chunkFilename: '[chunkhash].js',
//
// plugins:
//   new InlineChunkWebpackPlugin({
//     inlineChunks: ['manifest','app']
//   })

const config = {
  entry: {
    app: './src/entry.jsx',
  },
  devtool: "source-map",
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build'),
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({resource}) => /node_modules/.test(resource),
    }),
    new HtmlWebpackPlugin({
      title: 'Web Starter',
      template: 'views/index.ejs',
    }),
    new CopyWebpackPlugin([
      {from: 'common', to: ''}
    ]),
    new ExtractTextPlugin('[name].bundle.css'),
  ],
  module: {},
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

config.module = {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-0'],
        plugins: ['inferno', 'transform-decorators-legacy']
      }
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        loader: 'css-loader?importLoaders=1!postcss-loader'
      })
    }
  ]
};

if (isProd) {
  config.output.path = path.join(__dirname, './static');
  config.devtool = "none";
  config.module = {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['inferno', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1!postcss-loader'
        })
      }
    ]
  };
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'commons.[chunkhash:8].js',
      children: true,
      async: true,
      minChunks: 2
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
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
      },
    })
  );
}

module.exports = config;
