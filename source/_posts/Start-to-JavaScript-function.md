---
title: Start to JavaScript--function
categories:
  - Software Development
date: 2019-09-18 20:11:20
tags:
  - JavaScript
---
继续JS的路

今天是JS中的函数

- JS函数定义方法：

      function fname(para){
              ...;
              return xxx;
      }
- 由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多或者少也没有问题
- 关键字arguments与rest
  1. 利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：
          
          function abs() {
          if (arguments.length === 0) {
              return 0;
           }
          var x = arguments[0];
          return x >= 0 ? x : -x;
          }
  2. ES6标准引入了rest参数
  
          function foo(a, b, ...rest) {
            console.log('a = ' + a);
            console.log('b = ' + b);
            console.log(rest);
          }
          foo(1, 2, 3, 4, 5);
          // 结果:
          // a = 1
          // b = 2
          // Array [ 3, 4, 5 ]
          foo(1);
          // 结果:
          // a = 1
          // b = undefined
          // Array []
    
      rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数。
      如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是undefined）。
- JS中有一种变量提升的特性，即函数体的语句会首先被全部扫描，将所有声明的变量“提升”至函数的开头处，而不赋值，比如说：

        function foo() {
          var x = 'Hello, ' + y;
          console.log(x);
          var y = 'Bob';
        }
        foo();
  不报错，它相当于：
    
      function foo() {
        var y; // 提升变量y的申明，此时y为undefined
        var x = 'Hello, ' + y;
        console.log(x);
        y = 'Bob';
      }
  因此在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。最常见的做法是用一个var申明函数内部用到的所有变量
- 由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的，为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量。(const定义的常量也是具有块级作用域)
- map和reduce方法：
  
  1. map，批量处理array的元素：arr.map(func);
  2. reduce, Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算：[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)。比方说对一个Array求和，就可以用reduce实现：

          var arr = [1, 3, 5, 7, 9];
          arr.reduce(function (x, y){
              return x + y;
          }); // 25
- filter函数，用法和map类似，只是filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。例如，在一个Array中，删掉偶数，只保留奇数，可以这么写：

      var arr = [1, 2, 4, 5, 6, 9, 10, 15];
      var r = arr.filter(function (x) {
          return x % 2 !== 0;
      });
      r; // [1, 5, 9, 15]
  filter()接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示Array的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

      var arr = ['A', 'B', 'C'];
      var r = arr.filter(function (element, index, self) {
          console.log(element); // 依次打印'A', 'B', 'C'
          console.log(index); // 依次打印0, 1, 2
          console.log(self); // self就是变量arr
          return true;
      });
- sort方法也可以类似map这样使用，传入自己的排序规则。
- 其他常用方法:
  
  1.  every()方法可以判断数组的所有元素是否满足测试条件。
  2.  find()方法用于查找符合条件的第一个元素，如果找到了，返回这个元素，否则，返回undefined：
  3.  findIndex()和find()类似，也是查找符合条件的第一个元素，不同之处在于findIndex()会返回这个元素的索引，如果没有找到，返回-1：
  4. forEach()和map()类似，它也把每个元素依次作用于传入的函数，但不会返回新的数组。forEach()常用于遍历数组，因此，传入的函数不需要返回值： 
- 箭头函数：x => x * x
  相当于：function (x) {return x * x;}
  