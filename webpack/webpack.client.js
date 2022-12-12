/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/11/28 22:17
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: NodeJS 运行环境代码打包.
 */
const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')
const cwd = process.cwd()

module.exports = merge(webpack, {
   entry: {
    'client': path.resolve(cwd, './src/view/entry-client')
   },
   output: {
     libraryTarget : 'window'
   },
   //运行目标平台
   // target : 'node',
   // 对 bundle renderer 提供 source map 支持
   //生产时，请将此处的devtool改成false
   // devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
   devtool: process.env.NODE_ENV === 'production' ? false : "source-map",
   // 构建为单个 JSON 文件的插件。
   plugins : [
     new HtmlWebpackPlugin({
         title : "magic cube",
         filename: "index.html",
         template: "index.html",
         cache: false,
         inject: 'body',
         minify: false,
         favicon: join(cwd, "./static", "images/favicon.ico")
     })
   ]
})