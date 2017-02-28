const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const config = require(path.join(__dirname, '..', 'src', 'config', 'index'));

exports.WebpackCleanupPlugin = new WebpackCleanupPlugin({
  exclude: ["assets/**/*"]
});

exports.HtmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();
exports.HtmlWebpackExcludeAssetsPlugin = new HtmlWebpackExcludeAssetsPlugin();

exports.OfflinePlugin = new OfflinePlugin({
  caches: 'all',
  responseStrategy: 'network-first', // 'cache-first' | 'network-first'
  updateStrategy: 'changed', // 'changed' | 'all',
  excludes: ['**/.*', '**/*.map']
});

exports.HMRPlugin = new webpack.HotModuleReplacementPlugin();

exports.HtmlWebpackPlugin = new HtmlWebpackPlugin({
  title: config.title,
  template: 'src/templates/default.hbs',
  inject: true,
  cache: false,
  appMountId: 'root',
  // inlineSource: '.(css)$',
  excludeAssets: [/origo.css/],
  minify: {
    removeComments: isProd,
    collapseWhitespace: isProd,
    conservativeCollapse: isProd,
    minifyJS: isProd,
    minifyCSS: isProd
  }
});

exports.CopyPlugin = new CopyWebpackPlugin([
    {from: 'src/assets', to: './assets'}],
  {ignore: ['**/*.css', '*.js']},
  {copyUnmodified: isProd}
);

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
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread",
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-destructuring",
        "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-literals",
        "transform-es2015-modules-commonjs",
        "transform-es2015-parameters",
        "inferno",
        ["fast-async"]
      ]
    }
  } : {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [path.join(__dirname, '..', 'src')],
    query: {
      presets: [],
      plugins: [
        "add-module-exports",
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread",
        "transform-es2015-arrow-functions",
        "transform-es2015-block-scoped-functions",
        "transform-es2015-block-scoping",
        "transform-es2015-destructuring",
        "transform-es2015-classes",
        "transform-es2015-computed-properties",
        "transform-es2015-literals",
        "transform-es2015-modules-commonjs",
        "transform-es2015-parameters",
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

exports.URLRule = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  use: 'url-loader?limit=100000'
};

exports.HBSRule = {
  test: /\.hbs$/,
  use: 'handlebars-loader'
};
