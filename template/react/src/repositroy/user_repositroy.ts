/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/10 23:20
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 用户数据表服务类
 */
import {
    DataTable,
    TableColumn, 
    NullableColumn, 
    NotNullableColumn, 
    UniqueColumn, 
    PrimaryColumn, 
    ForeignColumn, 
    TableColumnEnum,
    DropTableIfExists,
    Business_UnitRepositroy
} from "@skysong/magic-cube"
import User from '../models/user'

@DropTableIfExists()
@DataTable("user", "innodb", "utf8mb4", "utf8mb4_general_ci")
export default class extends Business_UnitRepositroy<User> {

    @TableColumn('id', TableColumnEnum.String, "主键唯一", [30])
    @PrimaryColumn()
    @NotNullableColumn()
    id !: string;

    @TableColumn('name', TableColumnEnum.String, "用户名", [50])
    @UniqueColumn({ indexName: "idx_user_name", deferrable: "not deferrable", storageEngineIndexType: "btree", useConstraint: true })
    @NotNullableColumn()
    name !: string

    @TableColumn('age', TableColumnEnum.Integer, "年龄", [2])
    @NotNullableColumn()
    age !: number

    @TableColumn('email', TableColumnEnum.String, "email", [50])
    @NullableColumn()
    eMail !: string

    @TableColumn('sex', TableColumnEnum.BigInteger, "性别", [1])
    @NullableColumn()
    sex !: boolean

    @TableColumn('deptid', TableColumnEnum.String, "部门id", [30])
    @ForeignColumn("id", "department", "user", { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @NotNullableColumn()
    deptid !: string;
    
}