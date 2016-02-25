// This config is used when testing a local build 
// of the extension in Chrome

var baseConfig = require('./base');
var path = require('path');
var webpack = require('webpack');

module.exports = baseConfig({
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../chrome/build/')
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    })
  ],
  devtool: 'inline-source-map'
});