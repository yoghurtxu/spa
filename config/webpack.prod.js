const basicConfig = require('./webpack.basic');
const CONFIG = require('./index');

const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const uglifyJsPlugin = require("uglifyjs-webpack-plugin");
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const cleanWebpackPlugin = require('clean-webpack-plugin');
const inlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const prod = {
  mode: 'production',
  plugins: [
    new cleanWebpackPlugin([CONFIG.DIST], {
      allowExternal: true
    }),
    new miniCssExtractPlugin({
      filename: "[name].[hash:5].css"
    }),
    new htmlWebpackPlugin({
      title: 'index',
      loading: CONFIG.loading,
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments:true
      },
    }),
     new inlineManifestWebpackPlugin('runtime')
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  optimization: {
    minimizer: [
      new uglifyJsPlugin({}),
      new optimizeCSSAssetsPlugin({})
    ],
    runtimeChunk:{
      name:'runtime'
    },
    splitChunks: {}
  },
};

module.exports = merge(basicConfig, prod);
