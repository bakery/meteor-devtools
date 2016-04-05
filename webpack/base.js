var path = require('path');
var _ = require('underscore');

const srcPath = path.join(__dirname, '../src/');

module.exports = function(overrides){
  return _.extend({
    entry: [
      srcPath + 'main.jsx'
    ],
    module: {
      loaders: [
        {
          test: /\.js/,
          loaders: ['babel'],
          include: srcPath
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader!postcss-loader'
        }
      ]
    },
    postcss: () => [require('precss')],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
  }, overrides);
};