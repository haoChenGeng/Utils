//生产环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

//项目名字
var projectName = "/";

//生成生产环境目录
config.output.path=path.resolve(__dirname, '../dist/production');
config.output.filename ='[name].[chunkhash].js',
config.output.chunkFilename ="[name].[chunkhash].js"

//打包api 替换
config.module.loaders=(config.module.loaders || []).concat([
  { 
    test: path.resolve(__dirname, '../src' + projectName + 'assets/common/js/config.js'),
    loader: StringReplacePlugin.replace({
      replacements: [
          {
              pattern: /\/api\//g,
              replacement: function (match, p1, offset) {
                return '';
              }                
          },
          {
              pattern: /\/app\//g,
              replacement: function (match, p1, offset) {
                return '';
              }
          }
      ]})
  }
])

config.plugins = (config.plugins || []).concat([
  // 清除上一次生成的文件
  new CleanWebpackPlugin(['production'], {
      root: path.resolve(__dirname, '../dist'),
      verbose: true, 
      dry: false,
  }),
  //string替换
  new StringReplacePlugin(),
  // this allows uglify to strip all warnings
  // from Vue.js source code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  // This minifies not only JavaScript, but also
  // the templates (with html-minifier) and CSS (with cssnano)!
  //弱化警告信息
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin()
])

module.exports = config
