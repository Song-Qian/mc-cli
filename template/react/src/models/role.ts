/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/23 11:57
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 角色实体映射服务类
 */
import UserRole from './user_role'

export default class {

    id !: string;
    name !: string;
    enabled !: boolean;
    order !: number;

    userRole ?: UserRole;
}