/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/11/28 21:20
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 生产依赖插件配置
 */
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cwd = process.cwd();

module.exports = function() {

	if (Boolean(process.env.LD_LIBRARY_PATH)) {
		let copyPlugin = new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(cwd, 'node_modules/oracledb/build/Release/oracledb-5.5.0-darwin-x64.node'), to: process.env.LD_LIBRARY_PATH, force: true },
				{ from: path.resolve(cwd, 'node_modules/oracledb/build/Release/oracledb-5.5.0-linux-x64.node'), to: process.env.LD_LIBRARY_PATH, force: true },
				{ from: path.resolve(cwd, 'node_modules/oracledb/build/Release/oracledb-5.5.0-win32-x64.node'), to: process.env.LD_LIBRARY_PATH, force: true }
			]
		})

		return [
			copyPlugin
		]
	}
	return [];
}