/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/09/02 13:59
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 角色数据表服务类
 */
import {
    DataTable,
    TableColumn, 
    DefaultValueColumn,
    NotNullableColumn, 
    UniqueColumn, 
    PrimaryColumn,
    TableColumnEnum,
    DropTableIfExists,
    Business_UnitRepositroy
} from "@skysong/magic-cube"
import Role from '../models/role'

@DropTableIfExists()
@DataTable("role", "innodb", "utf8mb4", "utf8mb4_general_ci")
export default class extends Business_UnitRepositroy<Role> {
    
    @TableColumn("id", TableColumnEnum.String, "主键", [30])
    @PrimaryColumn()
    @NotNullableColumn()
    id !: string;

    @TableColumn("name", TableColumnEnum.String, "角色名称", [20])
    @UniqueColumn({ indexName: "idx_role_name", deferrable: "not deferrable", storageEngineIndexType: "btree", useConstraint: true })
    @NotNullableColumn()
    name !: string;

    @TableColumn("enabled", TableColumnEnum.BigInteger, "角色状态")
    @DefaultValueColumn(1, "def_role_enabled")
    @NotNullableColumn()
    enabled !: boolean;

    @TableColumn("order", TableColumnEnum.Integer, "排序", [7])
    @NotNullableColumn()
    order !: number;

}