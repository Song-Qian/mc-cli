/*
 * @Author: @skysong
 * @Date: 2023-02-15 13:17:29
 * @LastEditors: @skysong
 * @LastEditTime: 2023-03-18 09:57:40
 * @FilePath: /EasySQL/src/app.ts
 * @Description: electron 桌面启动入口
 * @eMail: songqian6110@dingtalk.com
 */
import { app, BrowserWindow, utilityProcess } from 'electron'
import { join } from 'path'
import keyBoardRegistry from '~/commons/keyboard-events'
import MagicCube from "@skysong/magic-cube"

const cwd = process.cwd();
const config = MagicCube.Config();
const createBrowserWindow = (opts: Electron.BrowserWindowConstructorOptions | undefined) => new BrowserWindow(opts);
const defaultWindowOpts = {
    width: 1366,
    height: 768,
    icon: join(cwd, require("~/images/favicon-48x48.png")),
    frame: false,
    darkTheme : true,
    resizable: true,
    transparent: false,
    titleBarOverlay: {
        color: "#fff",
        symbolColor: "#333"
    },
    webPreferences: { 
        nodeIntegration: true,
        nodeIntegrationInWorker : true,
        contextIsolation: false
    }
};

app.whenReady().then(() => {
    let win = createBrowserWindow(defaultWindowOpts);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            win = createBrowserWindow(defaultWindowOpts);
        }
    })
    win.loadURL(`http://${config.get('http.listener')}:${config.get('http.port')}/`);
}).then(keyBoardRegistry).catch(() => app.quit());

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})