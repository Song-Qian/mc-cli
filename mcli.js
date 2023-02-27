#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const logSymbols = require('log-symbols');
const inquirer = require('inquirer');
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const pkg = require("./package.json");
const package = require("./template/package")

// aix, darwin, freebsd, linux, openbsd, sunos, win32
// 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x64'
const platform = os.platform();
// const arch = os.arch();
const cwd = process.cwd();
const spinner = ora();
const user = os.userInfo();

program.command("init")
    .description("模板化《MagicCube》项目")
    .action(function() {

        spinner.start(chalk.green("开始初始化《MagicCube》项目 \n"));
        spinner.stopAndPersist();
        inquirer.prompt([
            { type: "input", message: "请输入项目名称？", name: "name", default: "MagicCube" },
            { type: "input", message: "请输入项目版本号：", name: "version", default: "0.0.1" },
            { type: "input", message: "请输入项目描述:", name: "description", default: "" },
            { type: "list", message: "请选择一个前端项目框架:", name: "frame", default: "vue", choices: ["vue", "react"] },
            { type: "input", message: "开发者：", name: "author", default: user.username },
            { type: "input", message: "请输入服务启动访问IP:", name: "ip", default: 'localhost', validate: (ip) => Boolean(/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(ip) || ip === "localhost") || "服务启动IP非法输入!" },
            { type: "input", message: "请输入服务启动访问端口:", name: "port", default: 8080, validate: (port) => 65535 < +port  || 0 > +port ? "端口号超出预判范围!" : true },
            { type: "confirm", message: "是否启用数据库模块？", name: "db", default: true },
            { type: "rawlist", message: "请选择一个数据库?", name: "dbType", default: "mysql", choices: [{ name: 'mysql', value: 'mysql' }, { name: 'sql server', value: 'mssql' }, { name: 'oracle', value: 'oracle' }, { name: 'postgresql', value: 'postgresql' }], when: (answer) => answer.db },
            { type: "list", message: "连接方式？", name: 'dbConnType', default: 'TNSName', choices: ['TNSName', 'ServiceName'], when: (answer) => answer.db && answer.dbType === "oracle" },
            { type: "input", message: "请输入数据库访问IP:", name: "dbip", default: 'localhost', validate: (ip) => Boolean(/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/.test(ip) || ip === "localhost") || "数据库IP非法输入!", when: (answer) => answer.db },
            { type: "input", message: "请输入数据库访问端口:", name: "dbPort", default:(answer) => ({ 'mysql': 3306, 'mssql': 1433, 'oracle': 1521, 'postgresql': 5432 }[answer.dbType]), validate:(port) => 65535 < +port  || 0 > +port ? "端口号超出预判范围!" : true, when: (answer) => answer.db },
            { type: "input", message: "请输入数据库用户名:", name: "dbuname", default: (answer) => ({ 'mysql': 'root', 'mssql': 'sa', 'oracle': 'sys', 'postgresql': 'postgres' }[answer.dbType]), when: (answer) => answer.db },
            { type: "password", message: "请输入数据库密码:", name: "dbpwd", default: "",  validate: (pwd) => (pwd.replace(/^(\s+)|(\s+)$/g, "") !== "") || "请输入数据库密码！", when: (answer) => answer.db },
            { type: "input", message: "请输入数据库名:", name: "dbname", default: "magic", validate: (dbname) => (dbname.replace(/^(\s+)|(\s+)$/g, "") !== "") || "数据库名不能为空!",  when: (answer) => answer.db }
        ]).then((answer) => {
                spinner.text = [logSymbols.success, chalk.green(`《${answer.name}》项目模板拷贝中...`)].join(" ");
                spinner.render();
                const isDirExists = fs.existsSync(`${cwd}/${answer.name}`);
                if (isDirExists) {
                    spinner.fail(chalk.red(`初始化失败，${cwd}/${answer.name} 目录已存在.`))
                    return;
                }
    
                const execPath = platform === 'win32' ? path.join(process.execPath, "../") : path.join(process.execPath, "../../lib");
                fs.mkdirSync(`${cwd}/${answer.name}`, { recursive: true, mode: 0o777 });
                let source = answer.frame === "vue" ?  path.join(execPath, "node_modules/@skysong/mc-cli/template/vue") : path.join(execPath, "node_modules/@skysong/mc-cli/template/react");
                fs.cpSync(source, `${cwd}/${answer.name}`, { recursive: true, force: true });
                const cur_pkg = package(answer.frame);
                cur_pkg.name = answer.name;
                cur_pkg.version = answer.version;
                cur_pkg.author = answer.author;
                cur_pkg.description = answer.description;
                const data = new Uint8Array(Buffer.from(JSON.stringify(cur_pkg)));
                fs.writeFileSync(`${cwd}/${answer.name}/package.json`, data, "utf8");
                fs.cpSync(path.join(execPath, "node_modules/@skysong/mc-cli/template/default.ini"), `${cwd}/${answer.name}/default.ini`, { force: true, recursive: true });
                let conf = fs.readFileSync(`${cwd}/${answer.name}/default.ini`, 'utf8');
                conf = conf.replace('name = "magic app"', `name = "${answer.name}"`);
    
                if (answer.db) {
                    conf = conf.replace('; [database]', '[database]').replace('; logger = true', 'logger = true').replace('; client = "mysql"', `client = "${answer.dbType}"`);
                    conf = conf.replace('; [database.connection]', '[database.connection]').replace('; user = "root"', `user = "${answer.dbuname}"`).replace('; password = "123456"', `password = "${answer.dbpwd}"`).replace('; timeout = 60000', 'timeout = 6000');
                    conf = conf.replace('; [database.pool]', '[database.pool]').replace('; min = 0', 'min = 0').replace('; max = 100', 'max = 100');
                    if (answer.dbType === "oracle" && answer.dbConnType === "TNSName") {
                        conf = conf.replace(
                            '; connectString = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 127.0.0.1)(PORT = 1521))) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = ORCL)))"', 
                            `connectString = "(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ${answer.dbip})(PORT = ${answer.dbPort}))) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = ${answer.dbname})))"`
                        );
                    } else {
                        conf = conf.replace('; host = "127.0.0.1"', `host = "${answer.dbip}"`).replace('; port = 3306', `port = ${answer.dbPort}`).replace('; database = "magic"', `database = "${answer.dbname}"`);
                    }
                    fs.writeFileSync(`${cwd}/${answer.name}/default.ini`, conf, 'utf8');
                }
                fs.chmodSync(`${cwd}/${answer.name}`, 0o777);
                fs.chownSync(`${cwd}/${answer.name}`, user.uid, user.gid);
                spinner.succeed(chalk.green(`初始化《${answer.name}》 完成\n`));
        }).catch((err) =>spinner.fail(chalk.red(err.message)));
    })

const Compile = program.command("start")
    .option("-v, --vue", "运行 vue 3.0 模板")
    .option("-r, --react", "运行 react 16.8+ 模板")
    .option("-e, --electron", "是否桌面应用")
    .option("--electron-port [port]", "桌面应用调试端口，默认: 3031")
    .option("-vapi, --vue-options-api", "是否启用Vue Option API")
    .option("-vtools, --vue-prod-devtools", "是否启用Vue Devtools")
    .option("-pro, --prod", "production 模式启动")
    .option("-p, --port [port]", "启动调试端口，默认:3030")
    .description("《MagicCube》项目启动")
    .action(function(option) {
        if (!option.vue && !option.react) {
            Compile.help((txt) => [logSymbols.error, chalk.red("启动失败，缺失Options命令.\n"), chalk.cyan(txt)].join(" "));
            return;
        }

        if (!option.vue && (option.vueOptionsApi || option.vueProdDevtools)) {
            Compile.help((txt) => [logSymbols.error, chalk.red("启用Vue Api模式，但缺失-v, --vue命令.\n"), chalk.cyan(txt)].join(" "));
            return;
        }

        process.env.port = typeof option.port === "number" ? option.port : 3030;
        process.env.NODE_ENV = option.prod ? "production" : "development";
        process.env.Electron = option.electron;
        process.env.SSR = option.react ? "React" : "Vue";
        process.env.electron_port = typeof option.electronPort === "number" ? option.electronPort : 3031;

        if (!option.react) {
            process.env.__VUE_OPTIONS_API__ = Boolean(option.vue && option.vueOptionsApi);
            process.env.__VUE_PROD_DEVTOOLS__ = Boolean(option.vue && option.vueProdDevtools);
        }

        const isEnterClientJS = fs.existsSync(option.vue ?`${cwd}/src/view/entry-client.ts` : `${cwd}/src/view/entry-client.tsx`);
        const isServerJS = fs.existsSync(`${cwd}/src/index.ts`);
        const isExistsDist = fs.existsSync(`${cwd}/dist`);
        const upkg = require(path.resolve(cwd, "./package.json"));
        const execPath = platform === 'win32' ? path.join(process.execPath, "../") : path.join(process.execPath, "../../lib");

        if (!isEnterClientJS || !isServerJS) {
            proce.stop();
            proce.fail(chalk.red(`《${upkg.name}》 启动入口文件找不到，请确认项目地址正确!`));
            console.log([logSymbols.warning, chalk.yellow(`可以尝试使用 mc-cli init ${option.vue ? '<-v, --vue>' : '<-r, --react>'} <projectName> 恢复项目.`)].join(""));
            console.log([logSymbols.warning, chalk.yellow(`  错误启动地址：${ option.vue ? `${cwd}/src/view/entry-client.ts` : `${cwd}/src/view/entry-client.tsx` }`)].join(""));
            console.log([logSymbols.warning, chalk.yellow(`  错误启动地址：${cwd}/src/index.ts`)].join(""));
            return;
        }

        spinner.start(chalk.green(`启动《${upkg.name}》项目`));
        let server, client, electron, nodemon;

        const runtimeFn = {
            "200" : (text) => {
                spinner.text = text;
                spinner.render();
            },
            "205" : () => {
                if (server && !server.killed) {
                    return;
                }
                server = platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "server"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "server"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                server.on("message", (res) => runtimeFn[res.code].apply(server, res.args))
            },
            "206" : () => {
                if (client && !client.killed) {
                    return;
                }
                client =  platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "client"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "client"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                client.on("message", (res) => runtimeFn[res.code].apply(client, res.args))
            },
            "207": () => {
                if (electron && !electron.killed) {
                    return;
                }
                electron = platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "electron"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "electron"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                electron.on("message", (res) => runtimeFn[res.code].apply(electron, res.args))
            },
            "208": () => {
                if (nodemon && !nodemon.killed) {
                    return;
                }
                nodemon = platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "nodemon"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "nodemon"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                nodemon.on("message", (res) => runtimeFn[res.code].apply(nodemon, res.args));
            }
        }

        if (isExistsDist) {
            return fs.rmdir(`${cwd}/dist`, { recursive: true }, () => {
                runtimeFn["205"]();
            })
        }
        runtimeFn["205"]();
    })

const Build = program.command("build")
    .option("-v, --vue", "运行 vue 3.0 模板")
    .option("-r, --react", "运行 react 16.8+ 模板")
    .option("-e, --electron", "是否桌面应用")
    .option("-vapi, --vue-options-api", "是否启用Vue Option API")
    .option("-vtools, --vue-prod-devtools", "是否启用Vue Devtools")
    .description("《MagicCube》项目生产打包")
    .action(function(option) {
        if (!option.vue && !option.react) {
            Compile.help((txt) => [logSymbols.error, chalk.red("启动失败，缺失Options命令.\n"), chalk.cyan(txt)].join(" "));
            return;
        }

        if (!option.vue && (option.vueOptionsApi || option.vueProdDevtools)) {
            Compile.help((txt) => [logSymbols.error, chalk.red("启用Vue Api模式，但缺失-v, --vue命令.\n"), chalk.cyan(txt)].join(" "));
            return;
        }

        process.env.NODE_ENV = "production";
        process.env.Electron = option.electron;
        process.env.SSR = option.react ? "React" : "Vue";

        if (!option.react) {
            process.env.__VUE_OPTIONS_API__ = Boolean(option.vue && option.vueOptionsApi);
            process.env.__VUE_PROD_DEVTOOLS__ = Boolean(option.vue && option.vueProdDevtools);
        }

        const isEnterClientJS = fs.existsSync(option.vue ?`${cwd}/src/view/entry-client.ts` : `${cwd}/src/view/entry-client.tsx`);
        const isServerJS = fs.existsSync(`${cwd}/src/index.ts`);
        const isExistsDist = fs.existsSync(`${cwd}/dist`);
        const upkg = require(path.resolve(cwd, "./package.json"));
        const execPath = platform === 'win32' ? path.join(process.execPath, "../") : path.join(process.execPath, "../../lib");

        if (!isEnterClientJS || !isServerJS) {
            proce.stop();
            proce.fail(chalk.red(`《${upkg.name}》 启动入口文件找不到，请确认项目地址正确!`));
            console.log([logSymbols.warning, chalk.yellow(`可以尝试使用 mc-cli init ${option.vue ? '<-v, --vue>' : '<-r, --react>'} <projectName> 恢复项目.`)].join(""));
            console.log([logSymbols.warning, chalk.yellow(`  错误启动地址：${ option.vue ? `${cwd}/src/view/entry-client.ts` : `${cwd}/src/view/entry-client.tsx` }`)].join(""));
            console.log([logSymbols.warning, chalk.yellow(`  错误启动地址：${cwd}/src/index.ts`)].join(""));
            return;
        }

        spinner.start(chalk.green(`开始《${upkg.name}》项目\n`));
        let server, client, electron;

        const runtimeFn = {
            "200" : (text) => {
                spinner.text = text;
                spinner.render();
            },
            "205" : () => {
                if (server && !server.killed) {
                    return;
                }
                server = platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "server"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "server"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                server.on("message", (res) => runtimeFn[res.code].apply(server, res.args))
            },
            "206" : () => {
                if (client && !client.killed) {
                    return;
                }
                client = platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "client"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "client"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                client.on("message", (res) => runtimeFn[res.code].apply(client, res.args))
            },
            "207": () => {
                if (electron && !electron.killed) {
                    return;
                }
                electron = platform === "win32" ? spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "electron"],{ cwd, env: process.env, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] }) : spawn("node", [path.join(execPath, "./node_modules/@skysong/mc-cli", "./compile.js"), "electron"],{ cwd, env: process.env, uid: user.uid, gid: user.gid, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
                electron.on("message", (res) => runtimeFn[res.code].apply(electron, res.args))
            },
            "208": () => {
                server && !server.killed && server.kill();
                client && !client.killed && client.kill();
                electron && !electron.killed && electron.kill();
                spinner.succeed(chalk.green(`编译完成《${upkg.name}》 完成\n`));
                console.log(chalk.green('请使用： node ./dist/index.build.js 启动项目'));
            }
        }

        if (isExistsDist) {
            return fs.rmdir(`${cwd}/dist`, { recursive: true }, () => {
                runtimeFn["205"]();
            })
        }
        runtimeFn["205"]();
    })

program.version(pkg.version, "-ver, --version", "查看当前 《MagicCube》 框架发布版本");

if (process.argv.length === 2) {
    program.help((txt) => chalk.cyan(txt));
}

program.parse(process.argv);