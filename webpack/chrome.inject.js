// This generates an inject.js bundle for Chrome


var baseConfig = require('./base');
var path = require('path');
var webpack = require('webpack');

const srcPath = path.join(__dirname, '../src/');

module.exports = baseConfig({
  entry: [
    srcPath + 'common/inject.js'
  ],
  output: {
    filename: 'inject.js',
    path: path.join(__dirname, '../chrome/build/')
  },
  plugins : [
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production'),
    //   }
    // }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compressor: {
    //     warnings: false
    //   }
    // })
  ],
});