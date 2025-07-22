在 JWT（JSON Web Token）认证中，“临期刷新” 是解决令牌过期后如何保持用户登录状态的核心问题。如果处理不好，会导致用户频繁被迫重新登录，严重影响体验。下面从为什么需要刷新、常见刷新方案、实现要点三个方面详细说明：

# 为什么要刷新？

JWT 的核心特性是无状态（服务器不存储令牌，仅通过签名验证合法性），但为了安全，令牌通常设置较短的过期时间（比如 15~30 分钟）—— 这是为了降低令牌被盗用后的风险。

但问题来了：如果令牌过期后必须让用户重新登录，体验会很差（比如用户正在编辑文档，令牌突然过期导致操作丢失）。因此，需要一种机制在令牌 “临期”（快过期但未完全过期）或 “刚过期” 时，自动获取新令牌，保持用户状态。

# 常见的jwt刷新方案

最成熟的方案是 “双令牌机制”：同时签发 访问令牌（Access Token） 和 刷新令牌（Refresh Token），分工明确。

1. 双令牌的角色分工

| 令牌 | 有效期 | 用途 | 特点|
| --- | --- | --- |---|
| Access Token |短（15~30 分钟  |用于 API 请求的身份验证（携带在 Header 中）  |无状态，服务器不存储，验证快 |
| Refresh Token | 长（7~30 天） | 仅用于获取新的 Access Token |需存储在服务器（如数据库），可吊销 |
# 核心流程之客户端判断临期
```
┌─────────┐                ┌─────────┐
│ 客户端  │                │ 服务器  │
└────┬────┘                └────┬────┘
     │  1. 登录请求（账号密码）        │
     ├─────────────────────────>│
     │                          │ 1.1 验证身份，生成双令牌
     │  2. 返回双令牌                 │
     │<─────────────────────────┤
     │  - access_token（含exp：15分钟后过期）
     │  - refresh_token（exp：7天后过期）
     │
     │  3. 客户端解析并存储令牌        │
     │  - 解析access_token的exp，计算过期时间点（如2024-07-01 10:15:00）
     │  - 存储：access_token（内存）、refresh_token（HttpOnly Cookie）
     │  - 设定临期阈值（如剩余5分钟时触发刷新）
     │
     │  4. 发起业务请求前，客户端先判断access_token状态 │
     │  - 未过期且非临期：直接携带access_token请求
     │  - 临期（当前时间 ≥ exp - 5分钟）：先刷新再请求
     │  - 已过期：直接触发刷新
     │
     │  5. 若无需刷新，直接请求API     │
     │  请求头：Authorization: Bearer <access_token>
     ├─────────────────────────>│
     │                          │ 5.1 验证access_token（仅验证签名和exp，不判断临期）
     │  6. 返回业务数据              │
     │<─────────────────────────┤
     │
     │  7. 若需要刷新（临期/过期），客户端发起刷新请求 │
     │  请求：POST /refresh（Cookie携带refresh_token）
     ├─────────────────────────>│
     │                          │ 7.1 验证refresh_token（签名、exp、数据库记录有效性）
     │  8. 返回新令牌                │
     │<─────────────────────────┤
     │  - 新access_token（exp：15分钟后）
     │  - 新refresh_token（可选，令牌轮换）
     │
     │  9. 客户端更新本地令牌          │
     │  - 替换旧access_token和refresh_token
     │  - 重新解析新access_token的exp，更新临期判断依据
     │
     │  10. 用新access_token发起业务请求 │
     ├─────────────────────────>│
     │  11. 返回业务数据              │
     │<─────────────────────────┤
```

#  服务端判断临期
- 临期时间：服务端设置的一个时间区间，如10分钟，当前时间到过期时间小于临期时间，则认为token临期，此时要刷新token
- 拿到过期时间
- 判断当前时间到过期时间是否小于临期时间
```
		expireAt := time.Unix(claims.StandardClaims.ExpiresAt, 0)
		//time.Until(expireAt),计算从当前时间（time.Now()）到 expireAt 这个时间点之间还剩多少时间，返回一个 time.Duration 类型。
		if time.Until(expireAt) < sc.JWTC.BufferDuration {
			sc.Logger.Info("jwt临期了,刷新jwt",
				zap.String("user", claims.UserName),
				zap.Any("旧token过期时间", time.Unix(claims.StandardClaims.ExpiresAt, 0)),
				zap.Any("临期窗口", sc.JWTC.BufferDuration),
			)
			// 生成新token
			user := claims.User
			newToken, err := models.SignToken(user, &config.Gcfg)
			if err != nil {
				common.Result5XX(0, gin.H{}, fmt.Sprintf("生成新token错误:%v", err.Error()), c)
				c.Abort()
				return
			}
			// 可以通过响应头或自定义字段返回新token
			c.Header("X-Refresh-Token", newToken)
		} else {
			sc.Logger.Info("jwt还没有过期",
				zap.String("user", claims.UserName),
				zap.Any("旧token过期时间", time.Unix(claims.StandardClaims.ExpiresAt, 0)),
				zap.Any("临期窗口", sc.JWTC.BufferDuration),
			)
		}
```