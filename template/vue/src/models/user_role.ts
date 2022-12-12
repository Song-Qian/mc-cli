/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/25 21:37
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 用户实体与角色实体外表映射服务类
 */
import User from './user'
import Role from './role'

export default class {
    
    id !: string;
    freeze !: boolean;
    description !: string;

    users ?: Array<User>;
    roles ?: Array<Role>;

}