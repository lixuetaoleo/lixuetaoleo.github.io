---
title: 我常用的ES6新特性
titleImage:
categories:
  - Software Development
date: 2020-03-13 16:42:00
tags:
  - 前端
  - JavaScript
---
总结一下我常用的"ES6"新特性

这里的ES6泛指ES5以后的新特性

---

1. let和const

它们解决了var造成的变量提升问题，

常用用法：默认使用 const，只有当确实需要改变变量的值的时候才使用 let

2. 模板字符串

需要拼接字符串的时候尽量改成使用模板字符串

3. 箭头函数

优先使用箭头函数，但是有几种情况是千万不能使用箭头函数的：
  
  1. 使用箭头函数定义对象的方法
  2. 定义prototype上的方法
  3. 做为事件的回调

究其原因，还是箭头函数没有this(或者说箭头函数的this是离它最近的一层非箭头函数的this)

4. Set和Map

set可以用来进行数组去重

map可以用来优化条件语句

5. for...of

用来遍历对象

6. Promise

解决回调地狱

7. Async

使代码更加优雅，并且可以使用在Promise中无法使用的try...catch

8. Class

9. 函数的默认值

10. ...符号

11. 解构赋值
