var path = require('path');

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
        test: /\.jsx$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'inline-source-map'
};