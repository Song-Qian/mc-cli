/**
 * Developer    :   @skysong
 * eMail        :   onlylove1172559463@vip.qq.com
 * Time         :   2021-06-01
 * Description  :   SSR 客户端入口
 */

import { createSSRApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import pinia, { useRouter } from '~/store'

import routerConfig from '~/commons/router_config'
import App from '~/view'

const app = createSSRApp(App);

const router = createRouter({
    history: createWebHistory(
        "/" //设置前端请求路径与服务端路径同步
    ),
    routes: routerConfig.getRouter()
})

app.use(router)
app.use(pinia)
useRouter(router)
app.mixin({ $pinia : pinia })

//激活客户端
router.isReady().then(() => {
    app.mount("#app");
})