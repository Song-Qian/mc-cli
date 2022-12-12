/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/08/25 22:25
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 部门实体映射服务类
 */
import { 
    DataTable, 
    ForeignColumn, 
    NotNullableColumn, 
    PrimaryColumn, 
    TableColumn, 
    TableColumnEnum,
    DropTableIfExists,
    Business_UnitRepositroy,
    UniqueColumn 
} from "@skysong/magic-cube"
import Department from '../models/department'

@DropTableIfExists()
@DataTable("department", "innodb", "utf8mb4", "utf8mb4_general_ci")
export default class extends Business_UnitRepositroy<Department> {

    @TableColumn("id", TableColumnEnum.String, "主键", [30])
    @PrimaryColumn()
    @NotNullableColumn()
    id !: string;

    @TableColumn("name", TableColumnEnum.String, "名称", [30])
    @UniqueColumn({ indexName: 'idx_department_name', deferrable: "not deferrable", storageEngineIndexType: "btree", useConstraint: true })
    @NotNullableColumn()
    name !: string;

    @TableColumn("p_department", TableColumnEnum.String, "上级部门", [30])
    @ForeignColumn("id", "department", "department", { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @NotNullableColumn()
    parent_department !: string;

}