# 调用方能够感知错误
- 这是一种社区公认的最佳实践
- 成功返回nil，失败返回具体error，让错误处理变得显式、可控。
- InitDB函数的返回值是 error 接口类型，gorm.Open的第二个返回值也是 error 接口类型（可以从gorm.Open的定义看到）。所以err也是error接口类型，而error接口类型有Error()方法，所以err可以通过err.Error()获取错误信息。
- error接口的定义:
```
  type error interface {
	Error() string
}
```
- 被调用方
```
func InitDB(sc *config.ServerConfig) error {
	dsn := sc.MysqlC.DSN
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		sc.Logger.Error("初始化mysql成功", zap.Error(err))
		return err 
	}
	Db = db
	return nil
}
```
- 调用方
```
	err = models.InitDB(sc)
	if err != nil {
		logger.Error("初始化mysql失败", zap.String("错误", err.Error())) //err.Error() 就是把 error 变成字符串，获取具体的错误描述文本。
		return
	}
```    
# 调用方不能感知错误
```
func InitDB(sc *config.ServerConfig)  {
	dsn := sc.MysqlC.DSN
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		sc.Logger.Error("初始化mysql成功", zap.Error(err))
	}
	Db = db
}
```
# 调用方感知错误的实践更优，理由如下：
在 Go 语言中，错误处理的常见实践是由调用方判断和处理错误，而不是在被调用函数内部直接处理（如直接 panic 或忽略）。这是 Go 错误处理哲学的核心原则之一。

- 具体来说：

    - 被调用函数的责任是：
    执行核心逻辑
    遇到错误时，将错误信息作为返回值返回（通常是最后一个返回值）
    不轻易使用 panic（除非是不可恢复的致命错误）
    - 调用方的责任是：
    检查被调用函数返回的错误
    根据错误类型和业务需求决定如何处理（重试、记录日志、返回上层等）

示例：

```
go
// 被调用函数：返回错误，不处理
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("除数不能为0") // 返回错误
    }
    return a / b, nil
}

// 调用方：判断并处理错误
func main() {
    result, err := divide(10, 0)
    if err != nil { // 调用方判断错误
        fmt.Println("错误：", err) // 处理错误
        return
    }
    fmt.Println("结果：", result)
}
```


这种模式的优势：

给调用方最大的灵活性，可根据上下文决定错误处理方式
错误处理逻辑与业务逻辑分离，代码更清晰
符合 Go 语言 "显式处理错误" 的设计理念

只有当发生程序无法继续运行的致命错误（如 nil 指针解引用）时，才会在被调用函数内部使用 panic。对于普通错误，始终遵循 "被调用函数返回错误，调用方判断处理" 的模式。