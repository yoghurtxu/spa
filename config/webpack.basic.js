const path = require('path');
const CONFIG = require('./index');
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpackBar = require('webpackbar');
const webpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, CONFIG.DIST),
    filename: 'src/[name].[hash:5].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 80
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '80-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 80
              }
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              quality: 85
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpackNotifierPlugin({title: 'Webpack done'}),
    new webpackBar(),
    new cleanWebpackPlugin('./build')
  ]
};