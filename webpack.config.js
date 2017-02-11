const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const pkg = require('./package.json');
const path = require('path')


const config = {
  entry: {
    app: './src/entry.jsx',
  },
  output: {
    filename: '[name].js',
    path: './public',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({resource}) => /node_modules/.test(resource),
    })],
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
        presets: ['es2015'],
        plugins: ['inferno', 'babel-plugin-transform-decorators-legacy']
      }
    }
  ]
}

if (isProd) {
  config.output.path = "./static";
  config.module = {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['inferno', 'babel-plugin-transform-decorators-legacy']
        }

      }
    ]
  }
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
