| 维度     | 方法接受者传参                          | 普通参数传参                     |
| ---------- | :---------------------------------------- | ---------------------------------- |
| 绑定关系 | 与类型绑定，属于类型的行为              | 独立于类型，属于工具函数         |
| 调用语法 | t.MethodName()伙子或者(&t).MethodName() | Func(t) 或者Func(&t)             |
| 使用场景 | 类型的核心行为（如 String(),Add()）     | 通用功能（如转换，校验，ID操作） |
| 拓展性   | 只能为当前包内的类型定义方法            | 可对任意内心（包括其他包）操作   |


#### 选择建议：

1. 当操作是类型的**核心行为** （如数据结构的增删改查、类型转换），用**方法接受者** 。
   例：`slice.Append()`、`map.Get()` 等。
2. 当操作是**通用功能** （如序列化、日志打印、格式转换），用**普通参数** 。
   例：`encoding/json.Marshal(t)`、`fmt.Println(t)` 等。
3. 对其他包的类型扩展功能时，只能用**普通参数** （Go 不允许为其他包的类型定义方法）。
   例：为 `time.Time` 写一个自定义格式化函数，只能用 `func FormatTime(t time.Time) string`。
