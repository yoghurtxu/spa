const basicConfig = require('./webpack.basic');
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const CONFIG = require('./index');

const merge = require('webpack-merge');
const dev = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      title: 'index',
      loading: CONFIG.loading,
      template: 'src/index.html',
      filename: 'index.html',
    }),
    new miniCssExtractPlugin({
      filename: "style/[name].css"
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, CONFIG.DIST),
    hot: true,
    open: true,
    port: 8080
  },
};

module.exports = merge(basicConfig, dev);
