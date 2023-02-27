/*
 * @Author: SongQian
 * @LastEditors: @skysong
 * @Date: 2022/11/28 21:20
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 生产依赖插件配置
 */
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const cwd = process.cwd();

module.exports = function() {

	let compression = new CompressionPlugin({
        test: /\.(js|css|html|png|jpg|gif|svg|eot|ttf|otf|woff|woff2)?$/i,     // 压缩文件格式
        filename: '[path][base].gz',   // 压缩后的文件名
        algorithm: 'gzip',             // 使用gzip压缩
        minRatio: 0.7                  // 压缩率小于1才会压缩
	})

	let copyPlugin = new CopyWebpackPlugin({
		patterns: [
			{ from: path.resolve(cwd, 'default.ini'), to: "default.ini", force: true }
		]
	})

	if (Boolean(process.env.LD_LIBRARY_PATH)) {
		copyPlugin = new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(cwd, 'node_modules/oracledb/build/Release/oracledb-5.5.0-darwin-x64.node'), to: process.env.LD_LIBRARY_PATH, force: true },
				{ from: path.resolve(cwd, 'node_modules/oracledb/build/Release/oracledb-5.5.0-linux-x64.node'), to: process.env.LD_LIBRARY_PATH, force: true },
				{ from: path.resolve(cwd, 'node_modules/oracledb/build/Release/oracledb-5.5.0-win32-x64.node'), to: process.env.LD_LIBRARY_PATH, force: true },
				{ from: path.resolve(cwd, 'default.ini'), to: "default.ini", force: true }
			]
		})

		return [ compression, copyPlugin ]
	}
	return [compression, copyPlugin];
}