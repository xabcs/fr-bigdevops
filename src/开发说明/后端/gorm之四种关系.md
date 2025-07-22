# 
- 文档 http://gorm.io/zh_CN/
- 仓库 https://github.com/go-gorm/gorm
- 外键定义的核心原则:举例说明
  - 假设我们有 Wallet（钱包）和 User（用户）两个模型，钱包属于用户（Belongs To 关系）：
  ```
  // 父模型（用户）
  type User struct {
    gorm.Model
    Name   string
  }
  // 子模型（钱包） 
  type Wallet struct {
  gorm.Model 
  Balance float64
  //  原则1，外键要定义在子模型中，存储关联字段的（User）的主键d的值
  UserID  uint   
  //  原则2，关联字段（User）通过foreignKey:外键字段绑定，标签必须卸载关联字段上，如果外键字段名称符合关联字段+ID的命名规则，则无需指定该标签
  //  原则3，外键名称需与 foreignKey 标签中的名称严格一致
  User    User   `gorm:"foreignKey:UserID"` // 关联字段：声明与User的关联
  }
  ```
# belongs To 关系 (属于)
- 关系：子模型属于父模型（子表关联主表，外键在子表）。
- 场景：如 “订单属于用户”（订单表有 user_id 外键关联用户表的 id）。
- 典型查询：通过子模型实例，查询它关联的唯一主模型数据。
- 适用场景：查看 “某个订单属于哪个用户”“某个钱包属于哪个用户” 等。
- 定义方式：在子模型中通过 gorm:"foreignKey:外键字段" 声明外键，并使用 BelongsTo 方法关联父模型。
```
// 父模型（用户）
type User struct {
  gorm.Model
  Name string
}

// 子模型（订单）
type Order struct {
  gorm.Model
  OrderNo string
  UserID  uint      // 外键（关联 User 的 ID）
  User    User      `gorm:"foreignKey:UserID"` // 声明 Belongs To 关联,标识当前订单可以关联一个用户对象
}

// 查询订单时关联用户
var order Order
db.Preload("User").First(&order, 1) // 会自动查询该订单所属的用户
```
- 解释上边的db.Preload("User").First(&order, 1) :
    - db.Preload("User").First(&order, 1)
Preload("User")是 GORM 中的预加载操作。当order模型与User模型存在关联关系（例如Belongs To关系，order属于User）时，Preload("User")会在查询order的同时，自动查询与order相关联的User记录。
    - 具体来说，它会执行两条查询语句：
        - 第一条是查询order记录本身，即SELECT * FROM orders WHERE id = 1 LIMIT 1。
        - 第二条是根据order记录中的外键（例如user_id）去查询相关联的User记录，假设外键是user_id，可能会执行类似SELECT * FROM users WHERE id = [the_user_id_from_order]这样的查询。
    - 最终将两条查询的结果合并到 order 变量中（order.User 字段会被填充）
- 在这里，外键起到了核心关联作用，是 Preload("User") 能够正常工作的基础
  - 外键决定了关联查询的条件
    - 当执行 db.Preload("User").First(&order, 1) 时：
        - 先查询订单 id=1，得到该订单的 UserID（比如 UserID=5）；
        - 再通过外键 UserID=5，查询 users 表中 id=5 的用户记录。

    - 整个过程中，外键 UserID 是连接 orders 表和 users 表的关键，没有外键，GORM 无法知道 “哪个订单属于哪个用户”，也就无法完成 Preload("User") 的关联查询。

-  疑问：为什么不在User模型中嵌套订单模型？
     - 在 GORM 中，是否在 User 结构体中嵌套 Order 字段，取决于业务需求中 “用户与订单的关联方向”。用户和订单的关系本质是 “一对多”（一个用户可以有多个订单），而 GORM 允许从两个方向定义关联，只是实际开发中会根据常用场景选择主要方向。
     - 1. 为什么通常在 Order 中关联 User，而非在 User 中嵌套 Order？
查询场景的优先级：
实际业务中，“通过订单查询所属用户” 的场景更常见（例如：查看某笔订单的下单用户信息），因此优先在 Order 中定义 Belongs To 关联（Order.User），方便通过订单快速获取用户。
而 “通过用户查询所有订单” 是另一个方向的需求，并非不支持，只是需要单独定义。
     - 2. 完全可以在 User 中定义订单关联（一对多）
如果业务需要 “查询用户的所有订单”，可以在 User 结构体中通过 Has Many 关联定义订单集合，例如：
```
// 用户结构体（主表）
type User struct {
  gorm.Model
  Name   string
  Orders []Order `gorm:"foreignKey:UserID"` // 声明 Has Many 关联：一个用户有多个订单
}
- 
// 订单结构体（子表）
type Order struct {
  gorm.Model
  OrderNo string
  UserID  uint   // 外键，指向 User.ID
  User    User   `gorm:"foreignKey:UserID"` // 声明 Belongs To：订单属于一个用户
}
```
- 此时：
通过订单查用户：db.Preload("User").First(&order, 1)（已有的方式）；
通过用户查所有订单：db.Preload("Orders").First(&user, 1)，GORM 会自动查询该用户的所有订单（WHERE user_id = 1）。
- 即使不在 User 结构体中添加 Orders []Order gorm:"foreignKey:UserID" 关联定义，依然可以通过手动构建查询条件的方式，实现 “通过用户查询所有订单” 的功能，只是无法使用 GORM 便捷的关联查询（如 Preload）


# Has One（一对一拥有关系）
- 关系：父模型拥有一个子模型。
- 核心功能：从 “主模型” 查询它拥有的唯一 “子模型”。
- 典型查询：通过主模型实例，查询它关联的唯一子模型数据。
- 场景：如 “用户有一个钱包”（钱包表有 user_id 外键关联用户表）。
- 定义方式：在父模型中通过 HasOne 方法关联子模型，子模型需包含指向父模型的外键
```
// 父模型（用户）
type User struct {
  gorm.Model
  Name   string
  //
  Wallet Wallet `gorm:"foreignKey:UserID"` // 声明 Has One 关联
}

// 子模型（钱包）
type Wallet struct {
  gorm.Model
  Balance float64
  UserID  uint // 外键（关联 User 的 ID）
}

// 查询用户时关联钱包
var user User
db.Preload("Wallet").First(&user, 1) // 会自动查询该用户的钱包
```
- 子模型（Wallet）中定义 UserID uint 的作用
  - 数据库层面的外键定义：
UserID 是物理存在的字段，对应数据库表 wallets 中的 user_id 列，用于实际存储关联关系（指向 users 表的 id）。
这是数据库层面的约束基础，没有这个字段，关联关系就失去了存储载体。
默认关联的基础：
  - GORM 会默认推断外键（规则：主模型名 +ID，如 User 对应 UserID），但显式定义 UserID 可以让代码更清晰，避免因模型名变化导致的关联错误。
- 主模型（User）中 gorm:"foreignKey:UserID" 的作用:
    - 主模型 User 中的 Wallet Wallet gorm:"foreignKey:UserID" 是逻辑层面的关联配置，用于告诉 GORM：
“User 与 Wallet 的 Has One 关联，需要通过 Wallet 中的 UserID 字段来建立”。
# 
Has many(一对多拥有关系)
- 核心功能：从 “主模型” 查询它拥有的多个 “子模型”。
- 典型查询：通过主模型实例，查询他关联的所有子模型数据
- 示例：
```
// 主模型：用户（拥有多个订单）
type User struct {
	gorm.Model
	Name   string
	Orders []Order `gorm:"foreignKey:UserID"` // Has Many 关联（切片类型）
}
// 子模型：订单（属于一个用户）
type Order struct {
	gorm.Model
	OrderNo string
	UserID  uint   // 外键
}
// 查询 ID=1 的用户，并预加载他的所有订单
db.Preload("Orders").First(&user, 1)  
//1,SELECT * FROM users WHERE id = 1 LIMIT 1;
//2,SELECT * FROM orders WHERE user_id = 1; -- 1 是主查询得到的用户ID
```

#  Many to Many (多对多：用户与角色)
- 关系：两个模型相互拥有多个对方实例（需中间表维护关联，中间表包含两个模型的外键）。
- 核心特点：通过 many2many:中间表名 声明多对多关系，GORM 会自动创建中间表（如 user_roles）
- 支持双向查询：支持双向查询：既可以通过用户查角色，也可以通过角色查用户
- 中间表存储两个模型的外键（如 user_id 和 role_id）
```
// 模型 1（用户）
type User struct {
  gorm.Model
  Name  string
  Roles []Role `gorm:"many2many:user_roles;"` // 声明多对多关联，指定中间表
}

// 模型 2（角色）
type Role struct {
  gorm.Model
  Name  string
  Users []User `gorm:"many2many:user_roles;"` // 与用户互相关联
}

// 中间表（自动生成或手动定义）：user_roles 包含 user_id 和 role_id 两个外键

// 查询用户时关联所有角色
var user User
db.Preload("Roles").First(&user, 1) // 会自动查询该用户的所有角色
// 查询角色时关联所有用户
var role Role
db.Preload("Users").First(&role, 1)

```
- ```db.Preload("Users").First(&role, 1) ```执行的过程是:
  - 1 解析关联配置：
    - gorm解析role结构体的user字段：
      - 识别到Users[]是多对多关联（通过many2many:user_roles标签）
      - 确定中间表位user_roles,关联逻辑位roles表-->user_roles表-->users表
  -  2 执行主查询（获取角色）
     -  `SELECT * FROM roles WHERE id = 1 LIMIT 1;`
  -  3,通过中间表查询关联的用户 ID
     -  `SELECT user_id FROM user_roles WHERE role_id = 1; -- 1 是主查询得到的角色ID`
     -  假设结果为 [101, 102]（即角色 1 关联了用户 101 和 102）。
  -  4,关联查询的用户数据
     - `SELECT * FROM users WHERE id IN (101, 102);`
  -  5,将查询结果赋给role.Users字段


```// 填充后的数据结构
role = Role{
  ID:   1,
  Name: "管理员",
  Users: []User{
    {ID: 101, Name: "张三"},
    {ID: 102, Name: "李四"},
  },
}
```