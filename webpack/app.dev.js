// This config is used when running the monitor locally
// as a standalone web application

var baseConfig = require('./base');
var path = require('path');
var webpack = require('webpack');

var srcPath = 

module.exports = baseConfig({
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../src/main.jsx')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/build/'
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    })
  ]
});