---
title: Start to JavaScript!
titleImage:
categories:
  - Software Development
date: 2019-09-17 21:30:04
tags:
  - JavaScript
---
因为各种原因和需要，从今天开始，我将正式学习JavaScript(ES6)。

使用的教程是廖雪峰大佬编写的，之前学习Python的时候也是跟着他的教程，非常的不错，地址贴出来：[廖雪峰JavaScript教程](https://www.liaoxuefeng.com/wiki/1022910821149312)

由于语言都是大同小异，因此在博文中我将只写出JS(ES6)与C++不太一样的地方。

Let's GO!

- JavaScript不区分整数和浮点数，统一用Number表示，以下都是合法的Number类型：

      123; // 整数123
      0.456; // 浮点数0.456
      1.2345e3; // 科学计数法表示1.2345x1000，等同于1234.5
      -99; // 负数
      NaN; // NaN表示Not a Number，当无法计算结果时用NaN表示
      Infinity; // Infinity表示无限大，当数值超过了JavaScript的Number所能表示的最大值时，就表示为Infinity

- 要特别注意相等运算符==。JavaScript在设计时，有两种比较运算符：

  第一种是``==``比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

  第二种是```===```比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。

  由于JavaScript这个设计缺陷，不要使用==比较，始终坚持使用```===```比较。

  另一个例外是NaN这个特殊的Number与所有其他值都不相等，包括它自己：

  NaN === NaN; // false
  唯一能判断NaN的方法是通过isNaN()函数：

      isNaN(NaN); // true

- JavaScript在设计之初，为了方便初学者学习，并不强制要求用var申明变量。这个设计错误带来了严重的后果：如果一个变量没有通过var申明就被使用，那么该变量就自动被申明为全局变量.因此最好是使用var来声明变量

- JS中的模板字符串：${varname}
- 需要特别注意的是，字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果
- JS字符串操作常用方法：
  
  1. toUpperCase()把一个字符串全部变为大写
  2. toLowerCase()把一个字符串全部变为小写：
  3. indexOf()会搜索指定字符串出现的位置：
  4. substring()返回指定索引区间的子串：

- 大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错。然而，JavaScript的Array却不会有任何错误。在编写代码时，不建议直接修改Array的大小，访问索引时要确保索引不会越界。

- JS中的Array操作常用方法：
  1. 与String类似，Array也可以通过indexOf()来搜索一个指定的元素的位置：
  2. slice()就是对应String的substring()版本，它截取Array的部分元素，然后返回一个新的Array(如果不给slice()传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个Array：)
  3. push()向Array的末尾添加若干元素，pop()则把Array的最后一个元素删除掉：
  4. 如果要往Array的头部添加若干元素，使用unshift()方法，shift()方法则把Array的第一个元素删掉：
  5. sort()可以对当前Array进行排序，它会直接修改当前Array的元素位置，直接调用时，按照默认顺序排序：
  6. reverse()把整个Array的元素给掉个个，也就是反转：
  7. splice()方法是修改Array的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：
  
          var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
          // 从索引2开始删除3个元素,然后再添加两个元素:
          arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
          arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
          // 只删除,不添加:
          arr.splice(2, 2); // ['Google', 'Facebook']
          arr; // ['Microsoft', 'Apple', 'Oracle']
          // 只添加,不删除:
          arr.splice(2, 0, 'Google', 'Facebook'); // 返回[],因为没有删除任何元素
          arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
  8. concat()方法把当前的Array和另一个Array连接起来，并返回一个新的Array：
  9. join()方法是一个非常实用的方法，它把当前Array的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：

          var arr = ['A', 'B', 'C', 1, 2, 3];
          arr.join('-'); // 'A-B-C-1-2-3'
  10. 如果数组的某个元素又是一个Array，则可以形成多维数组，例如：

- JavaScript的对象是一种无序的集合数据类型，它由若干键值对组成。JavaScript的对象用于描述现实世界中的某个对象。例如，为了描述“小明”这个淘气的小朋友，我们可以用若干键值对来描述他，访问属性是通过.操作符完成的，但这要求属性名必须是一个有效的变量名。如果属性名包含特殊字符，就必须用''括起来：：
      
      var xiaoming = {
      name: '小明',
      birth: 1990,
      school: 'No.1 Middle School',
      height: 1.70,
      weight: 65,
      score: null,
      'middle-school': 'No.1 Middle School'
      };

  用.或者['']来访问对象的属性。

- 由于JavaScript的对象是动态类型，你可以自由地给一个对象添加或删除属性：
- 如果我们要检测xiaoming是否拥有某一属性，可以用in操作符，不过要小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的：
  
        'toString' in xiaoming; // true
  因为toString定义在object对象中，而所有对象最终都会在原型链上指向object，所以xiaoming也拥有toString属性。

  要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法：

- 用JavaScript写一个Map如下：
        
        var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
        m.get('Michael'); // 95

- 遍历Array可以采用下标循环，遍历Map和Set就无法使用下标。为了统一集合类型，ES6标准引入了新的iterable类型，Array、Map和Set都属于iterable类型。
  
  具有iterable类型的集合可以通过新的for ... of循环来遍历。

  for ... of循环和for ... in循环有何区别？

  for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。

        var a = ['A', 'B', 'C'];
        a.name = 'Hello';
        for (var x in a) {
            console.log(x); // '0', '1', '2', 'name'
        }
    
  for ... in循环将把name包括在内，但Array的length属性却不包括在内。

  for ... of循环则完全修复了这些问题，它只循环集合本身的元素：

        var a = ['A', 'B', 'C'];
        a.name = 'Hello';
        for (var x of a) {
          console.log(x); // 'A', 'B', 'C'
        }
  
  因此，JS中的for...of而不是for...in更像是C++中的for...in
