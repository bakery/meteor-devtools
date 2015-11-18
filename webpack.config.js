var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/main.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'chrome/build'),
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  plugins : [
    new webpack.DefinePlugin({
      __DEVTOOLS__: false
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'inline-source-map'
};