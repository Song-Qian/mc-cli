/*
 * @Author: SongQian
 * @LastEditors: SongQian
 * @Date: 2022/10/13 10:14
 * @eMail: onlylove1172559463@vip.qq.com
 * @Description: 这是一个示例代码，解释ORM使用规则
 */
import {
    DataTable, 
    TableColumn, 
    DefaultValueColumn, 
    NullableColumn, 
    NotNullableColumn, 
    IndexColumn, 
    UniqueColumn, 
    PrimaryColumn, 
    IncrementsColumn,
    TableColumnEnum,
    IgnoreColumn,
    DropTableIfExists,
    Business_UnitRepositroy
} from '@skysong/magic-cube'
import Example from '~/models/example'

@DropTableIfExists()
@DataTable("example", "innodb", "utf8mb4", "utf8mb4_general_ci") // -> mysql, postgresql, oracle, mssql
export default class example extends Business_UnitRepositroy<Example>{
    
    ///描述主键使用
    /// @PrimaryColumn 当此表需要使用复合主键时，需要传参给修饰符, 如：@PrimaryColumn(['field1', 'field2', ...])
    /// @PrimaryColumn 如果当前表没有复合主键需求，但是有其它字段为增量字段， 则增量字段需要写入传参第1个key或者不写, 如： @PrimaryColumn(['increment', 'field1', 'field2', ...]), @PrimaryColumn(['field1', 'field2', ...])
    /// @PrimaryColumn 如果当前表没有复合主键需求，但是有UUID primaryKey 列， 则需要写复合主键， 如： @PrimaryColumn(['increment', 'UUID', 'field1', 'field2', ...])
    /// @PrimaryColumn 必须使用非空修饰符 @NotNullableColumn
    @TableColumn("id", TableColumnEnum.String, "主键", [30])
    @PrimaryColumn(['index', 'uuid', 'id'])
    @NotNullableColumn()
    id !: String;

    /// uuid 类型字段
    /// useBinaryUuid = true UUID是否使用二进制数据存储
    /// primaryKey = true 当前列是否主键
    @TableColumn('uuid', TableColumnEnum.UUID, "UUID列", [{ useBinaryUuid: false, primaryKey: true }])
    @NotNullableColumn()
    uuid !: string;

    /// 字符字段使用 varchar类型
    /// @UniqueColumn indexName 唯一索引名称。
    /// @UniqueColumn deferrable [postgresql, oracle, mssql] 支持 deferred（延迟不合格约束）, [mysql, mssql] 支持 not deferrable, [postgresql, oracle, mssql] 支持 immediate
    /// @UniqueColumn storageEngineIndexType 索引类型, innoDB 不支持hash 索引。 [postgresql, oracle, mssql] 支持 btree, hash
    /// @UniqueColumn useConstraint = true MSSQL创建时，是唯一约束而不是唯一索引 
    @TableColumn('name', TableColumnEnum.String, "字符字段", [50])
    @UniqueColumn({ indexName: "idx_example_name", deferrable: "not deferrable", storageEngineIndexType: "btree", useConstraint: false })
    @NullableColumn()
    name !: string;

    /// 检索字段
    /// @IndexColumn 第一个参数: 索引名， 
    /// indexType 索引类型 indexType: "FULLTEXT" | "SPATIAL", [mssql, oracle] 支持 FULLTEXT, SPATIAL, [postgresql, mysql] 不支持 indexType
    /// storageEngineIndexType 索引方式 storageEngineIndexType: "btree" | "hash", innoDB 不支持hash 索引。
    @TableColumn('tag', TableColumnEnum.String, "检索字段", [100])
    @IndexColumn("idx_tag", { storageEngineIndexType: "btree" })
    @NotNullableColumn()
    tag !: string;

    /// 自增量字段
    /// @IncrementsColumn 自增量， MySQL 增量字段必须是主键。 Oracle @IncrementsColumn 是通过序列和触发器SQL脚本实现自增功能，目前存在Bug, 暂不支持Oracle 使用。
    /// @NotNullableColumn 自增量字段必须是非空
    @TableColumn('index', TableColumnEnum.Integer, "增量字段")
    @IncrementsColumn({ primaryKey: true})
    @NotNullableColumn()
    index !: number;

    /// 外键字段
    /// @ForeignColumn 第一个参数： 外表主键(外表如果是复合主键，则不能使用外键约束)， 第二个参数： 外表名称， 第三个参数： 本表名称
    /// @ForeignColumn onDelete, onUpdate 删除或更新时，外键字段处理方式。 oracle 不支持此项设置。 
    /// [mysql, postgresql] 支持 "RESTRICT" | "CASCADE" | "SET NULL" | "NO ACTION", [mssql] 支持 "NO ACTION", [oracle] 不支持 onDelete, onUpdate
    /// @ForeignColumn postgresql, oracle, mssql, mysql 暂不支持复合主键建立外键关系
    @TableColumn('parent_id', TableColumnEnum.String, "外键字段", [30])
    // @ForeignColumn('id', 'example', 'example', { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @NotNullableColumn()
    parent_id !: String;

    /// 整型字段使用
    /// @DefaultValueColumn 是数据库默认值配置，constraintName 只存在于MySQL中生效。
    @TableColumn('size', TableColumnEnum.Integer, "整型字段", [10])
    @DefaultValueColumn('0')
    @NullableColumn()
    size !: number;

    /// 大整型字段使用
    /// @DefaultValueColumn 是数据库默认值配置，constraintName 只存在于MySQL中生效。
    @TableColumn('total', TableColumnEnum.BigInteger, "大整型字段")
    @DefaultValueColumn('0')
    @NullableColumn()
    total !: number;

    /// 文本字段使用 类型支持：text, longtext, mediumtext, tinytext
    @TableColumn('text', TableColumnEnum.Text, "文本字段", ['text'])
    @NullableColumn()
    text !: number;

    /// 单精度字段使用
    /// @TableColumn 单精度字段最后参数必须传入 [precision, scale], precision 整数部份长度， scale 小数部份长度。
    /// @NotNullableColumn 通常与 @DefaultValueColumn 配合使用。
    @TableColumn('price', TableColumnEnum.Float, "单精度字段", [10, 2])
    @DefaultValueColumn('0.00')
    @NotNullableColumn()
    price !: number;

    /// 双精度字段使用
    /// @TableColumn 双精度字段最后参数必须传入 [precision, scale], precision 整数部份长度， scale 小数部份长度。
    /// @NotNullableColumn 通常与 @DefaultValueColumn 配合使用。
    @TableColumn('money', TableColumnEnum.Double, "双精度字段", [10, 2])
    @DefaultValueColumn('0.00')
    @NotNullableColumn()
    money !: number;

    /// 十进制字段使用
    /// @TableColumn 十进制字段最后参数必须传入 [precision, scale], precision 整数部份长度， scale 小数部份长度。 只支持Oracle, SQLite, postgresql.
    /// @NotNullableColumn 通常与 @DefaultValueColumn 配合使用。
    @TableColumn('count', TableColumnEnum.Decimal, "十进制字段", [10, 2])
    @DefaultValueColumn('0.00')
    @NotNullableColumn()
    count !: number;

    /// 布尔字段
    @TableColumn('freeze', TableColumnEnum.Boolean, "布尔字段")
    @NullableColumn()
    freeze !: boolean;

    /// 日期字段
    @TableColumn('date', TableColumnEnum.Date, "日期字段")
    @DefaultValueColumn("1970-01-01") /// --mysql
    // @DefaultValueColumn("raw:DATE(TIMEZONE('UTC-8'::TEXT, NOW()))") /// --postgresql
    // @DefaultValueColumn("raw:CONVERT(varchar(100), GETDATE(), 20)") /// --mssql
    // @DefaultValueColumn("raw:to_date('2022-10-01', 'YYYY-MM-DD HH24:MI:SS')") /// --oracle
    date !: string;

    /// 时间字段
    @TableColumn('time', TableColumnEnum.Time, "时间字段")
    @DefaultValueColumn("12:00:00") /// --mysql
    // @DefaultValueColumn("raw:CURRENT_TIME") /// --postgresql
    // @DefaultValueColumn("raw:CONVERT(varchar(100), GETDATE(), 8)") /// --mssql
    // @DefaultValueColumn("raw:to_timestamp('18:00:00', 'HH24:MI:SS')") /// --oracle
    time !: string;

    /// 全日期字段
    @TableColumn('datetime', TableColumnEnum.DateTime, "全日期字段")
    @DefaultValueColumn("raw:NOW()") /// --postgresql, mysql
    // @DefaultValueColumn("raw:CONVERT(varchar(100), GETDATE(), 20)") /// --mssql
    // @DefaultValueColumn("raw:to_date('2022-10-01 18:00:00', 'YYYY-MM-DD HH24:MI:SS')") /// --oracle
    datetime !: string;

    /// 时间戳字段
    @TableColumn('now', TableColumnEnum.Timestamp, "时间戳字段")
    @DefaultValueColumn("raw:CURRENT_TIMESTAMP") /// --mysql
    // @DefaultValueColumn("raw:TIMEZONE('UTC-8'::TEXT, NOW()::TIMESTAMP(0) WITHOUT TIME ZONE)") /// --postgresql
    // @DefaultValueColumn("raw:CONVERT(varchar(100), GETDATE(), 20)") /// --mssql
    // @DefaultValueColumn("raw:to_date('2022-10-01 18:00:00', 'YYYY-MM-DD HH24:MI:SS')") /// --oracle
    now !: number;

    /// 二进制字段
    @TableColumn('file', TableColumnEnum.Binary, "二进制字段", [1024])
    file !: ArrayBuffer;

    /// 枚举类型字段
    /// [['苹果', '梨', '草莓', '百香果', '榴莲']] 枚举类型必须给出。
    /// useNative: true 使用提供的值来生成适当的Type
    @TableColumn('type', TableColumnEnum.Enum, "枚举类型", [['苹果', '梨', '草莓', '百香果', '榴莲'], { useNative: true, enumName: 'a_type' }])
    type !: number;

    /// JSON 类型字段，如果JSON 数据是Array类型，需要使用JSON.stringify() 方法转换后使用，旧版本的MySQL, PostgreSQL, SQLite 可能会使用Text列支持。
    @TableColumn('json', TableColumnEnum.Json, "JSON字段")
    json !: any;

    /// JSONB 类型字段，如果JSON 数据是Array类型，需要使用JSON.stringify() 方法转换后使用，旧版本的MySQL, PostgreSQL, SQLite 可能会使用Text列支持。
    @TableColumn("jsonb", TableColumnEnum.Jsonb, "JSONB字段")
    jsonb !: any;

    /// 几何字段，只支持SQLite, MySQL, MSSQL, ORACLE 数据库
    @TableColumn('geometry', TableColumnEnum.Geometry, "几何字段")
    @NullableColumn()
    // @IgnoreColumn()
    geometry !: any;

    /// 地理字段，只支持SQLite, MSSQL 数据库
    /// TableColumnEnum.Geography MYSQL 8+ 支持
    @TableColumn('geography', TableColumnEnum.Geography, "地理字段")
    @NullableColumn()
    @IgnoreColumn()
    geography !: any;

    /// Point类型字段，只支持MySQL, PostgreSql, Oracle]数据库
    @TableColumn('point', TableColumnEnum.Point, "点坐标字段")
    @NullableColumn()
    point !: any;

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
    async $afterDropTable(trx: any) : Promise<void> {
        // postgresql 对枚举类型会创建一个TYPE，如果该应用启动会删除表，此处应该要处理此表的枚举TYPE.
        // await trx.raw("DROP TYPE IF EXISTS ??", "a_type");
    }

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
     * @Date: 2022/10/17 14:54
     * @description: 创建表后，初始化表字段特性时持行。$beforeCreateTable 返回值为 true, 则此函数持行，反之不会持行。
     * @return {*}
     */    
    $updateTableColumnProps(trx: any, table: any, columnName : string, state : any) : Promise<void> | void  { }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 14:55
     * @description: 表特性、字段、索引等特性完成初始化后持。$beforeCreateTable 返回值为 true, 则此函数持行，反之不会持行。
     * @return {*}
     */    
    $afterTableInitialized(trx: any, table: any) : Promise<void> | void { }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 14:56
     * @description: 创建表之后持行，$beforeCreateTable 返回值为 true, 则此函数持行，反之不会持行。
     * @return {*}
     */ 
    $afterCreateTable(trx: any) : Promise<void> | void{ }

    /**
     * @LastEditors: SongQian
     * @Date: 2022/10/17 15:01
     * @description: 创建表完成钩子，此钩子函数不受任何钩子函数影响。
     * @return {*}
     */    
    $done(trx: any) : Promise<void> | void { }

    $errorHandler(error : any) : Promise<void> | void { }
}