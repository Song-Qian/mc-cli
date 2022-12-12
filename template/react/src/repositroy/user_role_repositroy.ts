/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/25 21:37
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 用户实体与角色实体外表映射服务类
 */

import { 
    DataTable, 
    DefaultValueColumn, 
    ForeignColumn, 
    NotNullableColumn, 
    NullableColumn, 
    PrimaryColumn, 
    TableColumn, 
    TableColumnEnum,
    DropTableIfExists,
    Business_UnitRepositroy
} from "@skysong/magic-cube"
import UserRole from '../models/user_role'

@DropTableIfExists()
@DataTable("user_role", "innodb", "utf8mb4", "utf8mb4_general_ci")
export default class extends Business_UnitRepositroy<UserRole> {
    
    @TableColumn("id", TableColumnEnum.String, "主键", [30])
    @PrimaryColumn()
    @NotNullableColumn()
    id !: string;

    @TableColumn("userid", TableColumnEnum.String, "用户外键Identifies", [30])
    @ForeignColumn("id", "user", "userRole", { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @NotNullableColumn()
    userid !: string;

    @TableColumn("roleid", TableColumnEnum.String, "角色外键Identifies", [30])
    @ForeignColumn("id", "role", "userRole", { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @NotNullableColumn()
    roleid !: string;

    @TableColumn("freeze", TableColumnEnum.BigInteger, "是否冻结")
    @DefaultValueColumn(0, "def_user_role_freeze")
    @NotNullableColumn()
    freeze !: boolean;

    @TableColumn("description", TableColumnEnum.String, "描述", [500])
    @NullableColumn()
    description !: string;

}