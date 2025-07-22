# ES6: JavaScript 的标准版本

- 本质：ES6 是 JavaScript 语言的一个重要版本更新，于 2015 年发布，引入了大量新特性，目的是增强 JavaScript 的功能和开发效率。
- 核心特性：

  - 变量声明：let、const（块级作用域）
  - 箭头函数（=>）
  - 类（class）和模块（import/export）
  - 解构赋值、扩展运算符（...）
  - 模板字符串（`...${}`）
  - Promise、迭代器等
- 特点：属于动态类型语言，运行时才会检查类型错误，浏览器或 Node.js 可直接运行（需考虑兼容性，可能需要 Babel 转译）。
# TypeScript:JavaScript 的超集
- 本质：TypeScript（TS）是微软开发的编程语言，是 JavaScript 的 “超集”—— 即 TS 包含所有 JS 语法，同时增加了静态类型系统。
- 核心特性：
    - 继承 ES6 及后续所有 JS 特性（支持class、import等）。
    - 静态类型：允许为变量、函数参数、返回值等指定类型（如number、string、自定义接口等），编译时就会检查类型错误。
接口（interface）、泛型（Generics）等高级类型特性，增强代码的可读性和可维护性。
 - 特点：TS 不能直接在浏览器或 Node.js 中运行，必须通过编译器（如tsc）转译为 JavaScript 后才能执行；通过类型约束减少运行时错误，适合大型项目。
# vue3中使用
  - Vue 3 对 TypeScript 有一等支持，通过 ```<script setup lang="ts"> ```开启，核心是利用类型系统约束数据和方法。
  - Vue 3 本身基于 ES6+ 构建，天然支持绝大多数 ES6 特性，日常开发中可直接使用