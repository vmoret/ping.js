var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var minimize = true;

module.exports = {
  devtool: 'source-map',
  debug: true,

  entry: {
    'vendor': [
      'angular',
      'babel-polyfill'
    ],
    'app': './app/app'
  },

  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: '[name].min.js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.css', '.html']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.min.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common', filename: 'common.min.js' }),
    new webpack.optimize.UglifyJsPlugin({ minimize: minimize })
  ]
};