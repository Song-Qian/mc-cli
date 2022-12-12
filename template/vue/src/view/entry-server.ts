/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   SSR 服务端入口
 */

import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import pinia, { useRouter } from '~/store'
import routerConfig from '~/commons/router_config'
import { renderToString } from '@vue/server-renderer'

import App from '~/view'

export default (iniConfig: any) => {

    const app = createSSRApp(App);

    const router = createRouter({
        history: createMemoryHistory(
            //设置前端请求路径与服务端路径同步
            iniConfig.get("http.server").base
        ),
        routes: routerConfig.getRouter()
    })

    app.use(router)
    useRouter(router)
    app.mixin({ $pinia : pinia })

    return { vue : app, router, store : pinia, transform: (SSRApp : any) => Promise.resolve(renderToString(SSRApp)) }
}