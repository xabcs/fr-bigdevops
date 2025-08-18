- **路径参数**
- 嵌入在 URL 路径中，用于标识具体资源
  -  **前端(Vue)**
    ``` script
    // 路由定义：/users/:userId
    this.axios.get(`/api/users/${this.userId}`); // 拼接路径参数
    ```
    - **后端(GIn)**
    ```
    r.GET("/api/users/:userId", func(c *gin.Context) {
        userId := c.Param("userId") // 获取路径参数
    })
    ```
- **url参数**
- 跟在 URL 问号后的键值对，用于筛选 / 分页
  - **前端(Vue)**
   ``` script
    r.GET("/api/users", func(c *gin.Context) {
        page := c.Query("page") // 获取URL参数
        size := c.DefaultQuery("size", "10") // 带默认值
    })
  ```
    - **后端(GIn)**
    ```
    r.GET("/api/users", func(c *gin.Context) {
        page := c.Query("page") // 获取URL参数
        size := c.DefaultQuery("size", "10") // 带默认值
    })
    ```
- **请求体参数**
- 包含在请求消息体中，用于传递复杂数据
  - **前端(Vue)**
  ```
    this.axios.post("/api/users", { 
        name: "张三", 
        age: 20 
    }); // 请求体携带数据
  ```
  - **后端(GIn)**
  ```
    r.POST("/api/users", func(c *gin.Context) {
        var user User
        c.BindJSON(&user) // 解析请求体JSON
    })
  ```
  三种参数同时使用的场景：



| 业务场景   | 请求方法 | 路径参数      | URL 参数     | 请求体参数      | 完整 URL / 请求示例                                                                 |
|-------------|----------|-------------|---------------|----------|------------|
| 分页查询某用户的订单并筛选状态 | GET      | /users/:userId/orders     | ?page=1&size=10&status=paid  | 无（GET 无请求体）                                        | GET /users/123/orders?page=1&size=10&status=paid                                    |
| 批量修改某分类下的商品属性   | PUT      | /categories/:categoryId   | ?force=true（强制覆盖）      | [{"id": 456, "price": 99}, {"id": 789, "price": 199}]     | PUT /categories/3?force=true<br>请求体：上述 JSON 数组                              |
| 提交某课程的作业并指定评分标准 | POST     | /courses/:courseId/homework | ?deadline=2024-12-31         | {"content": "作业内容...", "fileUrl": "xxx.pdf"}           | POST /courses/5/homework?deadline=2024-12-31<br>请求体：上述 JSON                   |
| 部分更新用户资料并校验版本   | PATCH    | /users/:userId/profile    | ?version=2                   | {"nickname": "新昵称", "phone": "13800138000"}             | PATCH /users/123/profile?version=2<br>请求体：上述 JSON                             |