# zap库的使用的几个场景
1.集成Gin的http请求日志，记录框架的每次http请求的日志，一般使用中间件的方式

```
package middleware

import (
	"bytes"
	"io"
	"time"

	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func NewGinZaplogger(logger *zap.Logger) gin.HandlerFunc {
	return ginzap.GinzapWithConfig(logger, &ginzap.Config{
		UTC:        true,
		TimeFormat: time.RFC3339,
		// TraceID:    false,
		Context: (func(c *gin.Context) []zapcore.Field {
			fields := []zapcore.Field{}
			if requestID := c.Writer.Header().Get("X-Request-Id"); requestID != "" {
				fields = append(fields, zap.String("request_id", requestID))
			}
			//记录请求的bady,在post请求的时候查看参数格式
			var body []byte
			var buf bytes.Buffer
			tee := io.TeeReader(c.Request.Body, &buf)
			body, _ = io.ReadAll(tee)
			c.Request.Body = io.NopCloser(&buf)
			//记录认证信息
			authHeader := c.Request.Header.Get("Authorization")
			fields = append(fields, zap.String("body", string(body)))
			fields = append(fields, zap.String("Authorization", string(authHeader)))
			return fields
		}),
	})
}

```

2. 业务逻辑日志，在业务需要的时候主动记录的日志
- 定义创建logger的函数
```
package common

import (
	"os"

	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

func NewZaplogger(logLevel, logFilePath string) *zap.Logger {
	//日志级别
	atomicLevel := zap.NewAtomicLevel()
	switch logLevel {
	case "DEBUG":
		atomicLevel.SetLevel(zapcore.DebugLevel)
	case "INFO":
		atomicLevel.SetLevel(zapcore.InfoLevel)
	case "WARN":
		atomicLevel.SetLevel(zapcore.WarnLevel)
	case "ERROR":
		atomicLevel.SetLevel(zapcore.ErrorLevel)
	case "DEFAULT":
		atomicLevel.SetLevel(zapcore.InfoLevel)
	}

	//设置默认字段
	encoderConfig := zapcore.EncoderConfig{
		TimeKey:        "time",
		LevelKey:       "level",
		NameKey:        "name",
		CallerKey:      "line",
		FunctionKey:    "func",
		MessageKey:     "msg",
		StacktraceKey:  "stacktrace",
		LineEnding:     zapcore.DefaultLineEnding,
		EncodeLevel:    zapcore.LowercaseLevelEncoder, // 小写编码器将日志级别转换为小写，并为输出进行颜色编码
		EncodeTime:     zapcore.TimeEncoderOfLayout("2006-01-02 15:04:05"),
		EncodeDuration: zapcore.SecondsDurationEncoder,
		EncodeCaller:   zapcore.FullCallerEncoder,
		EncodeName:     zapcore.FullNameEncoder,
	}
	//日志轮转
	writer := &lumberjack.Logger{
		Filename:   logFilePath,
		MaxSize:    1, // MB
		MaxAge:     2,
		LocalTime:  true,
		MaxBackups: 5,
		Compress:   true,
	}

	// 打印控制台的core
	zapCoreConsole := zapcore.NewCore(
		zapcore.NewJSONEncoder(encoderConfig),
		zapcore.AddSync(os.Stdout),
		atomicLevel,
	)
	//写入文件的core
	zapCoreFile := zapcore.NewCore(
		zapcore.NewJSONEncoder(encoderConfig),
		zapcore.AddSync(writer), // zapcore.Level(logLevel),
		atomicLevel,
	)
	//控制台和文件一起输出
	core := zapcore.NewTee(
		zapCoreConsole,
		zapCoreFile,
	)
	return zap.New(core, zap.AddCaller())
}
```
创建logger
```
pacakge main
func main() { 
  	logger := common.NewZaplogger(sc.LogLevel, sc.LogFilePath)
	defer logger.Sync()  
    sc.Logger = logger
}
```
记录日志
```
			sc.Logger.Info("jwt还没有过期",
				zap.String("user", claims.UserName),
				zap.Any("旧token过期时间", time.Unix(claims.StandardClaims.ExpiresAt, 0)),
				zap.Any("临期窗口", sc.JWTC.BufferDuration),
			)
```