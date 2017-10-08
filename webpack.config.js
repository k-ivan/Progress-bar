var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    progress: './src/js/progress.js'
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'postcss-loader', 'sass-loader'],
          publicPath: 'dist'
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  devServer: {
    port: 8080,
    stats: "minimal"
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({}),
    new ExtractTextPlugin('./css/progress.css'),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html'
    })
  ]
};