var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.config.js');

module.exports = merge(common, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({})
  ]
});


