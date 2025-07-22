- 在 Go 语言中，error、Error() 和 err 是错误处理体系的三个核心要素，它们的关系和作用可以总结如下：

### 1. error：错误接口类型
- 本质：Go 内置的接口类型，定义了错误的标准行为。
- 作用：作为所有错误的统一接口，要求实现者必须提供 Error() string 方法，使得不同来源的错误可以被统一处理。
- 特点：是一种抽象类型，不能直接创建实例，只能通过具体类型实现它。
- 定义：
```go
type error interface {
    Error() string
}
```

### 2. Error()：接口方法
- 本质：error 接口唯一要求的方法，返回值为 string。
- 作用：返回错误的具体描述信息（人类可读的字符串）。
- 实现：由具体的错误类型（如标准库的 *errorString、自定义错误结构体等）实现，不同错误类型的 Error() 逻辑不同：
    - 简单错误可能直接返回预设字符串；
    - 复杂错误可能拼接错误码、上下文等信息；
    - 包装错误会包含原始错误信息。
    - 在应用程序中使用 errors.New() 或 fmt.Errorf() 创建自定义错误是Go 社区最常见的做法，尤其适合业务逻辑中需要区分具体错误类型的场景（如你的 JWT 验证逻辑）。
    - 例如，标准库和很多知名框架（如 Gin、GORM）都会大量使用这种方式定义错误（如 io.EOF、gorm.、ErrRecordNotFound），简洁且高效。
    - 所以gorm能返回"Error 1049 (42000): Unknown database 'gorm'"这种字符串，是应为gorm库中自定义了Error()方法
- 使用：通过错误变量调用（如 err.Error()），或打印错误时由 fmt 包自动调用（如 fmt.Println(err)）。

### 3. err：错误变量的约定名称
- 本质：社区约定的错误变量名（非关键字），通常用于接收函数返回的错误值。
- 类型：其静态类型是 error 接口，可指向任何实现了 error 接口的具体值。
- 作用：作为错误的 “载体”，传递函数执行过程中产生的错误信息，供调用方判断和处理（如 if err != nil）。
# 三者关系和使用流程

- 函数执行时若发生错误，会创建一个实现了 error 接口的具体值（如通过 errors.New() 或自定义错误类型）。
- 该具体值被赋值给 err 变量（类型为 error 接口），作为函数返回值传递给调用方。
- 调用方通过 err != nil 判断是否发生错误，若发生错误，可通过 err.Error() 获取错误描述并处理。

# errors.New()和fmt.Errorf()
Go 中通常使用 errors 包的 New 函数或 fmt 包的 Errorf 函数创建错误：

- errors.New(text string) error：创建一个简单的错误信息
- fmt.Errorf(format string, v ...interface{}) error：可以格式化错误信息，更灵活
```
package main

import (
    "errors"
    "fmt"
)

func divide(a, b int) (int, error) {
    if b == 0 {
        // 使用 errors.New 创建简单错误
        return 0, errors.New("除数不能为零")
        
        // 或使用 fmt.Errorf 创建格式化错误
        // return 0, fmt.Errorf("除数 %d 不能为零", b)
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("错误:", err)
        return
    }
    fmt.Println("结果:", result)
}
```
# 判断错误 errors.Is
```
package main

import (
    "errors"
    "fmt"
)

var ErrDivByZero = errors.New("除数不能为零")

func divide(a, b int) (int, error) {
    if b == 0 {
        // 包装错误（保留原始错误信息）
        return 0, fmt.Errorf("除法失败: %w", ErrDivByZero)
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        // 使用 errors.Is 判断错误类型
        if errors.Is(err, ErrDivByZero) {
            fmt.Println("捕获到除数为零的错误")
        } else {
            fmt.Println("其他错误:", err)
        }
        return
    }
    fmt.Println("结果:", result)
}
```