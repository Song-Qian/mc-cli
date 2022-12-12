/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/11/28 21:56
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: webpack.config 入口配置
 */
const { merge } = require('webpack-merge');
var miniCssExtractPlugin = require('mini-css-extract-plugin');
const entry = require("./entry")
const output = require("./output")
const rules = require("./rules")
const resolve = require("./resolve")
const optimization = require("./optimization")
const plugins = require("./plugins")

module.exports = merge({
  entry : entry,
  output: output,
  module: {
    rules: [
      ...rules(miniCssExtractPlugin)
    ]
  },
  resolve: resolve,
  optimization: optimization,
  plugins: [
    new miniCssExtractPlugin({
      filename: 'assets/css/[name].css'
    }),
    ...plugins()
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? false : 'error'
  },
  //生产时，请将此处的devtool改成false
  devtool: process.env.NODE_ENV === 'production' ? false : "source-map"
})