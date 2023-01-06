/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/11/21 16:07
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 视图案例
 */
import {
    DataView,
    TableColumn,
    DropTableIfExists,
    TableColumnEnum,
    Business_UnitRepositroy
} from '@skysong/magic-cube'

import Model from '../models/view'

@DropTableIfExists()
@DataView("jurisdiction", "select u.id, u.`name`, u.email, d.`name` department_name, r.`name` role_name  from `user` u inner join department d on (u.deptid = d.id) inner join user_role ur on (u.id = ur.userid) inner join role r on (r.id = ur.roleid)")
export default class extends Business_UnitRepositroy<Model> {

    @TableColumn("id", TableColumnEnum.String, "主键", [30])
    id !: string;

    @TableColumn("name", TableColumnEnum.String, "名称", [30])
    name !: string;

    @TableColumn("email", TableColumnEnum.String, "邮箱", [30])
    email !: string;

    @TableColumn("department_name", TableColumnEnum.String, "部门名称", [30])
    department_name !: string;

    @TableColumn("role_name", TableColumnEnum.String, "角色名称", [30])
    role_name !: string;


    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/14 22:57
     * @description: @DropTableIfExists 钩子函数，在创建表之前，如果该表存在，则触发此钩子函数。支持async & Promise操作。
     * @return {*} true 阻止数据表被删除, 反之则遵守 @DropTableIfExists 规则。
     */    
     $beforeDropTable(trx: any) : boolean | Promise<boolean> {
        return false;
    }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 14:43
     * @description: 当 @DropTableIfExists 规则正常持行，并且当前存在example表存在，则此钩子是表被删除后调用。
     * @return {*} 无
     */    
    $afterDropTable(trx: any) : Promise<void> | void { }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 14:46
     * @description: 创建表之前持行。钩子函数被调用时，通过返回值判断是否创建表。
     * @return {*} true 创建表， false 阻止表被创建。
     */    
    $beforeCreateTable(trx: any) : boolean | Promise<boolean> {
        return true;
    }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 14:52
     * @description: 创建表之后，初始化表的特性之前持行。$beforeCreateTable 返回值为 true, 则此函数持行，反之不会持行。
     * @return {*}
     */    
    $beforeTableInitialize(trx: any) : Promise<void> | void { }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 15:01
     * @description: 创建表完成钩子，此钩子函数不受任何钩子函数影响。
     * @return {*}
     */    
    $done(trx: any) : Promise<void> | void { }

    $errorHandler(error : any) : Promise<void> | void { }

}