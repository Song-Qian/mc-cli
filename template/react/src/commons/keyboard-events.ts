/**
 * Developer    :   SongQian
 * Time         :   2022-03-05
 * eMail        :   onlylove1172559463@vip.qq.com
 * Description  :   keyboard event registry
 */

import { globalShortcut, BrowserWindow } from 'electron'

const devTools = () => {
    globalShortcut.register('CommandOrControl+f12', () => {
        let ws = BrowserWindow.getAllWindows();
        if (ws.length > 0) {
            let mainWindow = ws[0] || null;
            if (mainWindow) {
                mainWindow.webContents.openDevTools();
            }
        }
    })
}

export default function () {
    devTools();
}