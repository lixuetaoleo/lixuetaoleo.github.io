---
title: Effective-C++-2
titleImage:
categories:
  - Software Development
date: 2019-11-04 22:24:34
tags:
  - C++
---
# Item 4：确认对象被使用前已经先被初始化
1. 内置类型以外的任何其他东西，初始化的责任落在ctor上。规则很简单：确保每一个ctor都将对象里面的每一个成员初始化。
2. 注意：别混淆了赋值和初始化。C++规定，对象的成员变量其初始化动作发生在进入ctor本体之前，所以写构造函数时，应该用member initialization list来替换赋值动作。如果采用ctor函数体赋值，首先会调用default ctor然后再对成员变量进行赋值，这样一来default ctor的一切作为都浪费了，使得效率也比较低。
3. 在initialization list中列出所有的成员变量，这样就不用记住哪些成员变量无需初值。
4. 成员变量是const或者reference，它们就一定要初值，不能被赋值。
5. 有时候一个class有多个ctor，这时如果用member initialization list进行初始化，则会显得繁琐，此时则可以利用一个赋值函数(通常是private)，把那些“赋值表现得像初始化一样好”的变量(通常是内置类型)，放到这个函数中然后在构造函数中进行调用。`但是还是更推荐member initialization list`。
6. member initialization list列出的成员变量，其排列顺序应该和它们在class中声明次序相同。

# Item 5：了解C++默默编写并调用哪些函数
1. 写一个类，就算没写ctor，dctor，拷贝构造，拷贝赋值，编译器也会声明这几个default函数，并且它们是public和inline。
2. 除非这个类的基类有声明virtual的析构函数，否则编译器产出的析构函数是非虚的。
3. 如果打算在一个内含reference成员或const成员的class支持赋值操作，那么必须定义自己的拷贝赋值操作符，否则编译不通过。
4. 如果某个基类讲拷贝赋值操作符声明为private，编译器不会为派生类生成一个拷贝赋值操作符。因为派生类无权访问基类的private。

# Item 6：若不想使用编译器自动生成的函数，就该明确拒绝
1. 可以将这些方法放在private里，这样就成功阻止它们被调用。
2. 但是上面的做法不是100%安全，因为member函数和friend函数还是可以调用。因此可以将这些函数进行声明但是不定义，此时如果某些函数想调用它们，则会报链接错误。
3. 如果想把链接错误转为编译错误，可以利用如下方法：
   
   设计一个把拷贝构造和拷贝赋值放进private里的基类(命名为Uncopyable)，然后派生类继承这个基类。

   tip: boost提供了一个noncopyable的class。

   这样一来，如果某个member函数或者friend函数想调用拷贝赋值或者拷贝构造，编译器报错。原因见Item5的第四条。
