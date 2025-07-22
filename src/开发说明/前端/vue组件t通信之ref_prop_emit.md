1. props（父传子）
作用：父组件向子组件传递数据。
用法：
父组件在使用子组件时，通过属性传递数据（如 ```<Child :msg="parentMsg" />```）。
子组件通过 props 选项声明接收（如``` props: ['msg']```），之后就能直接用``` this.msg ``` 访问。
举例：父组件想给子组件传一个用户名，就用 props。
2. emit（子传父）
作用：子组件向父组件传递数据或触发父组件的方法。
用法：
子组件通过 ```this.$emit```('事件名', 数据) 触发事件（如 ```this.$emit('change', 123)```）。
父组件在使用子组件时，通过 @事件名 监听（如 ```<Child @change="handleChange" />```），在 handleChange 方法中接收数据。
举例：子组件的按钮被点击后，通知父组件更新数据，就用 emit。
3. ref（父访问子 / 子访问父）
作用：直接获取组件或 DOM 元素的实例，从而访问其数据或方法。
用法：
在组件或 DOM 上添加 ref 属性（如``` <Child ref="childComp" /> ```）。
通过``` this.$refs.childComp ```访问子组件实例，进而调用其方法或获取数据（如``` this.$refs.childComp.someMethod()```）。
注意：ref 更适合偶尔的、简单的通信，优先用 props 和 emit 保持组件独立性。

# 总结
如果你看到的是渲染后的内容，以下是原始的Markdown源码：

| 方式 | 代码示例（Vue 2语法） |
| ---- | ---- |
| props | 父组件：`<Child :user="parentUser" />`（传递数据）<br>子组件：`props: ['user']`（接收），使用`this.user`访问 |
| emit | 子组件：`this.$emit('submit', inputValue)`（触发事件 + 传值）<br>父组件：`<Child @submit="handleSubmit" />`，在`handleSubmit(val)`中接收`val` |
| ref | 父组件：`<Child ref="childRef" />`（定义`ref`）<br>调用：`this.$refs.childRef.childMethod()`（访问子组件方法） |
