/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/10 23:20
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 用户实体映射服务类
 */
import UserRole from './user_role'
import Department from './department'

export default class {

    id !: string;
    name !: string;
    age !: number;
    eMail !: string;
    sex !: boolean;
    deptid !: string;
    
    department ?: Department;
    userRole ?: UserRole;
}