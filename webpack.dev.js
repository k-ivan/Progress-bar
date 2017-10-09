var merge = require('webpack-merge');
var common = require('./webpack.config.js');

module.exports = merge(common, {
  devServer: {
    port: 8080,
    stats: "minimal",
    contentBase: './dist'
  }
});