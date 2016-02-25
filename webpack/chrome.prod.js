// This config is used in production Chrome extension

var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./base');

module.exports = baseConfig({
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../chrome/build/')
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    })
  ]
});