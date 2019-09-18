---
title: Start to JavaScript--OOP
categories:
  - Software Development
date: 2019-09-18 21:04:18
tags:
---
- JavaScript不区分类和实例的概念，而是通过原型（prototype）来实现面向对象编程。
  
  原型是指当我们想要创建xiaoming这个具体的学生时，我们并没有一个Student类型可用。那怎么办？恰好有这么一个现成的对象：

      var robot = {
        name: 'Robot',
        height: 1.6,
        run: function () {
          console.log(this.name + ' is running...');
        }
      };

  我们看这个robot对象有名字，有身高，还会跑，有点像小明，干脆就根据它来“创建”小明得了！
  于是我们把它改名为Student，然后创建出xiaoming：
  
        var Student = {
        name: 'Robot',
        height: 1.2,
        run: function () {
            console.log(this.name + ' is running...');
        }
        };

        var xiaoming = {
            name: '小明'
        };

        xiaoming.__proto__ = Student;

- JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。

- 在编写JavaScript代码时，不要直接用obj.____proto__去改变一个对象的原型，并且，低版本的IE也无法使用__proto____。Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，因此，我们可以编写一个函数来创建xiaoming：

        // 原型对象:
        var Student = {
            name: 'Robot',
            height: 1.2,
            run: function () {
                console.log(this.name + ' is running...');
            }
        };

        function createStudent(name){
            // 基于Student原型创建一个新对象:
           var s = Object.create(Student);
            // 初始化新对象:
            s.name = name;
            return s;
        }

        var xiaoming = createStudent('小明');
        xiaoming.run(); // 小明 is running...
        xiaoming.__proto__ === Student; // true

- 原型继承暂时没有看。。感觉略过于复杂。。。

- 关键字class从ES6开始正式被引入到JavaScript中。class的目的就是让定义类更简单。继承用extends

- 因为不是所有的主流浏览器都支持ES6的class。如果一定要现在就用上，就需要一个工具把class代码转换为传统的prototype代码，可以试试Babel这个工具。