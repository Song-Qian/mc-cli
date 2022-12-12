/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   SSR 客户端入口
 */

import * as React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'

import App from './index'

const store = createStore((state, action) => state);

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById("app")
)

