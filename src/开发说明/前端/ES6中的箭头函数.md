- 箭头函数的基本语法
  - 基础形式：(参数) => 表达式
示例：const add = (a, b) => a + b;（等价于普通函数function add(a, b) { return a + b; }）
  -  若函数体有多行代码，需用大括号包裹并显式写return：(参数) => { 代码块; return 结果; }
示例：const multiply = (a, b) => { const res = a * b; return res; }
  - 若只有一个参数，可省略括号：参数 => 表达式
示例：const double = x => x * 2;