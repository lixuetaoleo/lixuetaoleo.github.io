---
title: JavaScript中new的原理及手动模拟实现
categories:
  - Software Development
date: 2020-02-18 16:23:28
tags:
  - JavaScript
  - 前端
---
js中使用new创造的实例可以：

1. 访问到构造函数里的属性
2. 访问到构造函数prototype里的属性

得到手动模拟实现new的代码：
```js
function objectFactory(){
    const argument = [...arguments];
    let obj = new Object();
    let Constructor = argument.shift();
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, argument);
}
```
但是有一个问题，就是假如构造函数有返回值，如下例子：
```js
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
```
在这个例子中，构造函数返回了一个对象，在实例 person 中只能访问返回的对象中的属性。
如果构造函数返回的只是一个基本类型的值，则没有影响(相当于没有返回值)

所以，对上面模拟new代码进行优化，返回的时候判断类型
```js
function objectFactory(){
    const argument = [...arguments];
    let obj = new Object();
    let Constructor = argument.shift();
    obj.__proto__ = Constructor.prototype;
    let ret = Constructor.apply(obj, argument);
    return typeof ret === 'object' ? ret:obj;
}
```
