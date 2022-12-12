/**
 *  Developer   : SongQian
 *  Time        : 2021-06-01
 *  Email       : onlylove1172559463@vip.qq.com
 *  Description : 页面路径配置写在此处即可
 */
import { RouteRecordRaw } from 'vue-router'

export default class {

  public static getRouter (): RouteRecordRaw[] {

    let routers: RouteRecordRaw[] = [{
        name : "magic cube",
        path : '/home',
        component: () => import("~/view/home"),
      }, {
        name : 'NotFound',
        path: '/:pathMatch(.*)*',
        redirect: { name : 'magic cube' }
      }
    ]
    return routers
  }

}
