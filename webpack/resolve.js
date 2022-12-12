/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/11/28 21:25
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 路径语法糖配置
 */
const path = require("path");
const cwd = process.cwd();

module.exports = {
    extensions : ['.js', '.ts', '.tsx', '.json', '.sass', '.scss', '.css'],
    alias: Object.assign(
        { '~' : [path.join(cwd, './src'), path.join(cwd, './static')] },
        process.env.SSR === "Vue" ? { 'vue$' : path.join(cwd, './node_modules', 'vue') } : {},
        process.env.SSR === "React" ? { 'react' : path.resolve(path.join(cwd, "./node_modules/react")) } : {},
        process.env.SSR === "React" ? { 'ReactDOMServer': path.resolve(path.join(cwd, "./node_modules/react-dom/server.js")) } : {},
        process.env.SSR === "React" ? { 'StaticRouter': path.resolve(path.join(cwd, "./node_modules/react-router")) } : {}
    )
}