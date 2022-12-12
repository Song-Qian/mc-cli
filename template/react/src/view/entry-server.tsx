/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   SSR 服务端入口
 */
import * as React from 'react'
import { createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from './index'

export default (iniConfig: any) => {

    const store = createStore((state, payload) => state);
    
    const router = <App base={ iniConfig.get("http.server").base } />

    return { 
        react : router, router, store, transform: (props: any) => Promise.resolve(renderToString(<StaticRouter basename={ props.basename } children={ props.children } location={ props.location } ></StaticRouter>)) 
    }
}