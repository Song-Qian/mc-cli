/*
 * @Author: SongQian
 * @LastEditors: @skysong
 * @Date: 2022/12/07 21:22
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 这是一个魔术，来自Author创作，需要修改请留下大名~!
 */
const os = require("os");
const path = require("path");
const chalk = require("chalk");
const logSymbols = require('log-symbols');
const { spawn, exec } = require("child_process");
const user = os.userInfo();
const cwd = process.cwd();
const platform = os.platform();
const execPath = platform === 'win32' ? path.join(process.execPath, "../") : path.join(process.execPath, "../../lib");

if (process.argv[2] === "server") {
    const upkg = require(path.resolve(cwd, "./package.json"));
    let webpack_server_args = ['-w', '--config', `${path.resolve(execPath, "node_modules/@skysong/mc-cli")}/webpack/webpack.server.js`, `--mode`, process.env.NODE_ENV, '--progress'];
    let child_process = platform === "win32" ?  spawn("webpack", webpack_server_args, { cwd, env: process.env, shell: true }) : spawn("webpack", webpack_server_args, { cwd, env: process.env, uid: user.uid, gid: user.gid });
    //child_process.__output = '';
    child_process.stdout.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        //child_process.__output = [logSymbols.success, chalk.grey(text), chalk.green(`《${upkg.name}》SSR服务端编译完成。\n`)].join(" ");
        process.send({ code: 206, args: [] });
    });

    child_process.stderr.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        if (text) {
            let step = /(\d{0,3})(?=%)/g.test(text) ? (text.match(/(\d{0,3})(?=%)/g).at(0) || 0) : 0;
            let success = new Array(Math.round(Number(step) * 0.2)).join(" ");
            let error = new Array(Math.round(Number(100 - step) * 0.2)).join(" ");
			//child_process.__output,
            process.send({
                code : 200,
                args: [
                    [logSymbols.success, chalk.green(` --Watch 《${upkg.name}》${chalk.bgGreen(success)}${chalk.bgWhite(error)} SSR服务端编译中...\n`), chalk.dim(text)].join(" ")
                ]
            });
        }
    })
}

if (process.argv[2] === "client") {
    const upkg = require(path.resolve(cwd, "./package.json"));
    let webpack_client = ['-w', `--config`, `${ path.join(execPath, "node_modules/@skysong/mc-cli") }/webpack/webpack.client.js`, `--mode`, process.env.NODE_ENV, '--progress'];
    let child_process = platform === "win32" ? spawn("webpack", webpack_client, { cwd, env: process.env, shell: true }) : spawn("webpack", webpack_client, { cwd, env: process.env, uid: user.uid, gid: user.gid });

    child_process.stdout.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        //child_process.__output =  [logSymbols.success, chalk.grey(text), chalk.green(`《${upkg.name}》SSR客户端编译完成。\n`)].join(" ");
        process.send({ code: process.env.Electron ? 207 : 208, args: []  });
    });

    child_process.stderr.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        if (text) {
            let step = /(\d{0,3})(?=%)/g.test(text) ? (text.match(/(\d{0,3})(?=%)/g).at(0) || 0) : 0;
            let success = new Array(Math.round(Number(step) * 0.2)).join(" ");
            let error = new Array(Math.round(Number(100 - step) * 0.2)).join(" ");
            process.send({
                code : 200,
                args: [[logSymbols.success, chalk.green(` --Watch 《${upkg.name}》${chalk.bgGreen(success)}${chalk.bgWhite(error)} SSR客户端编译中...\n`), chalk.dim(text)].join(" ")]
            });
        }
    })
}

if (process.argv[2] === "electron") {
    const upkg = require(path.resolve(cwd, "./package.json"));
    let webpack_electron = ['-w', `--config`, `${ path.join(execPath, "node_modules/@skysong/mc-cli") }/webpack/webpack.electron.js`, `--mode`, process.env.NODE_ENV, '--progress'];
    let child_process = platform === "win32" ? spawn("webpack", webpack_electron, { cwd, env: process.env, shell: true }) : spawn("webpack", webpack_electron, { cwd, env: process.env, uid: user.uid, gid: user.gid });

    child_process.stdout.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        process.send({ code: 208, args: []  });
    });

    child_process.stderr.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        if (text) {
            let step = /(\d{0,3})(?=%)/g.test(text) ? (text.match(/(\d{0,3})(?=%)/g).at(0) || 0) : 0;
            let success = new Array(Math.round(Number(step) * 0.2)).join(" ");
            let error = new Array(Math.round(Number(100 - step) * 0.2)).join(" ");
            process.send({
                code : 200,
                args: [[logSymbols.success, chalk.green(` --Watch 《${upkg.name}》${chalk.bgGreen(success)}${chalk.bgWhite(error)} 桌面应用编译中...\n`), chalk.dim(text)].join(" ")]
            });
        }
    })
}


if (process.argv[2] === "nodemon") {
	
    let dev_node = ['--watch', `${cwd}/dist`, `--inspect-brk=${process.env.port} ${cwd}/dist/index.build.js`];
    let electron_args = ['--watch', `${cwd}/dist/main.build.js`, `--inspect-brk=${process.env.electron_port} ${cwd}/dist/main.build.js`];
    let child_process = platform === "win32" ? spawn("nodemon", dev_node, { cwd, env: process.env, shell: true }) : exec(`nodemon ${dev_node.join(' ')}`, { cwd, env: process.env, uid: user.uid, gid: user.gid });
    if (process.env.Electron) {
        let electron_process = platform === "win32" ? spawn("electron", electron_args, { cwd, env: process.env, shell: true }) : exec(`electron ${electron_args.join(' ')}`, { cwd, env: process.env, uid: user.uid, gid: user.gid });
        electron_process.stdout.on('data', (data) => {
            let text = data.toString().replace(/^(\s+)$/ig, '');
            process.send({
                code : 200,
                args: [[logSymbols.success, chalk.green(text)].join(" ")]
            });
        });
    
        electron_process.stderr.on('data', (data) => {
            let text =  data.toString().replace(/^(\s+)$/ig, '');
            process.send({
                code: 200,
                args: [chalk.yellow(text)]
            })
        })
    }

    child_process.stdout.on('data', (data) => {
        let text = data.toString().replace(/^(\s+)$/ig, '');
        process.send({
            code : 200,
            args: [[logSymbols.success, chalk.green(text)].join(" ")]
        });
    });

    child_process.stderr.on('data', (data) => {
        let text =  data.toString().replace(/^(\s+)$/ig, '');
        process.send({
            code: 200,
            args: [chalk.yellow(text)]
        })
    })
}