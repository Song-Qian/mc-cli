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

    let copyPlugin = new CopyWebpackPlugin({
        patterns: [
            { from: path.resolve(cwd, './node_modules/oracledb/build/Release/*.node'), to: path.join(process.env.LD_LIBRARY_PATH, "[name][ext]") }
        ]
    })

    return [
        copyPlugin
    ]
}