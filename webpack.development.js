var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var port = 80;

module.exports = {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    './app/index',
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app'),
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
    proxy: {
      '/api*': {
        target: 'https://graphyte-console.herokuapp.com',
        secure: true,
      },
    },
  },
};
