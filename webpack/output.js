/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/11/28 21:19
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 生产配置.
 */
const path = require("path");
const cwd = process.cwd();

module.exports = {
    'filename': "[name].build.js",
    'path' : path.resolve(cwd, './dist'),
    'publicPath': "/",
    'assetModuleFilename': "assets/[ext]/[name].[ext]"
}