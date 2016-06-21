var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var vendor = require('./package.json').dependencies;

vendor = Object.keys(vendor);
var port = process.env.PORT || 8080;

module.exports = {
  devtool: 'eval',
  entry: {
    devServer: `webpack-dev-server/client?http://localhost:${port}`,
    hotReload: 'webpack/hot/only-dev-server',
    app: './app/index',
    vendor,
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '/[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '/vendor.bundle.js'),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app'),
    },
    {
      test: /\.jpe?g$/,
      loader: 'file-loader',
    },
    {
      test: /\.svg$/,
      loader: 'file-loader',
    },
    {
      test: /\.css$/,
      loader: 'style!css?modules',
      // include: /flexboxgrid/,
    }],
  },
  devServer: {
    port,
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api*': {
        target: 'http://localhost:5100',
        // target: 'https://graphyte-console.herokuapp.com',
        secure: false,
      },
    },
  },
};
