var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var buildPath = path.resolve(__dirname, 'dist');
var vendor = require('./package.json').dependencies;

vendor = Object.keys(vendor);

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: {
    app: './app/index',
    vendor,
  },
  output: {
    path: buildPath,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
    }, {
      test: /\.jpe?g$/,
      loader: 'file-loader',
    }, {
      test: /\.svg$/,
      loader: 'file-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css?modules',
    }],
  },
};

module.exports = config;
