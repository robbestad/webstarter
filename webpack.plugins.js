const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.HMRPlugin = new webpack.HotModuleReplacementPlugin();

// exports.commonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
//   name: 'vendor',
//   minChunks: ({resource}) => /node_modules/.test(resource),
// });

exports.WebpackPlugin = new HtmlWebpackPlugin({
  title: 'Web Starter',
  template: 'src/templates/default.ejs',
  inject: true,
  appMountId: 'root',
  serviceWorker: 'src/assets/service.js',
});

exports.CopyPlugin = new CopyWebpackPlugin([
  {from: 'common', to: ''}
]);

exports.ExtractPlugin = new ExtractTextPlugin("styles.css");

/* Production plugins *************************/

exports.EnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

exports.NamedModulesPlugin = new webpack.NamedModulesPlugin();

exports.CommonChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'commonchunks',
  minChunks: ({resource}) => /node_modules/.test(resource)
});

exports.LoaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
});

exports.UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
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

exports.BabelRule = isProd ? {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
      presets: [],
      plugins: [
        "add-module-exports",
        "transform-es2015-modules-commonjs",
        "transform-es2015-destructuring",
        "transform-object-rest-spread",
        "transform-decorators-legacy",
        "transform-class-properties",
        "inferno",
        ["fast-async"]
      ]
    }
  } : {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [path.join(__dirname, 'src')],
    query: {
      presets: [],
      plugins: [
        "add-module-exports",
        "transform-es2015-modules-commonjs",
        "transform-es2015-destructuring",
        "transform-object-rest-spread",
        "transform-decorators-legacy",
        "transform-class-properties",
        "inferno",
        ["fast-async"]
      ]
    }
  };

exports.CSSRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    use: 'css-loader?importLoaders=1!postcss-loader'
  })
};
