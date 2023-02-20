/*
 * @Author: SongQian
 * @LastEditors: @skysong
 * @Date: 2022/11/28 22:23
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: Electron 运行环境代码打包
 */
const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('./webpack.config')
const cwd = process.cwd()

module.exports = merge(webpack, {
  entry: {
    'main': path.resolve(cwd, './src/app')
  },
  output: {
    libraryTarget : 'umd'
  },
  //运行目标平台
  target : 'electron-main',
  // 对 bundle renderer 提供 source map 支持
  //生产时，请将此处的devtool改成false
  // devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  //  externals : nodeExternals({ allowlist: /\.(js|ts(x?)|(png|jpg|gif|svg)|((sa|sc|c)ss)|(eot|svg|ttf|otf|woff|woff2))$/ }),
  // 构建为单个 JSON 文件的插件。
  plugins : [
  ]
})