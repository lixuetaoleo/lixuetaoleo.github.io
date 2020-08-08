---
title: Effective C++ 8
titleImage:
categories:
  - Software Development
date: 2019-11-22 19:07:26
tags:
  - C++
---
# Item 26：尽可能延后变量定义式的出现时间
1. 原因：
  * 假设一开始就定义变量，会构造对象；
  * 但是如果在后续代码中没有用到这个变量的时候却发生异常退出了，那么又会析构对象；
  * 如果在类里没有自己写构造，还会产生default构造。
2. 做法：不应该只延后变量的定义，直到非得使用该变量的前一刻为止，甚至应该尝试延后这份定义直到能够给他初值实参为止。
3. 变量在循环体外和循环体内定义的成本：
  * 循环体外定义：1个构造 + 1个析构 + n个赋值
  * 循环体内定义：n构造 + n析构
  * 除非已经清楚赋值成本低于“构造+析构”，正在处理代码中效率高敏感度的部分，否则应该把变量在循环体内定义

# Item 27：尽量少做转型动作
1. const_cast通常被用来将对象的常量性转除，也是唯一一个有此能力的C++-STYLE转型操作符。
2. 如果要在派生类中调用父类函数，以下做法是错误的：
```
class Base{
  virtual void fun() {...}
};
class Derived : public Base{
  virtual void fun(){
      static_cast<Base>(*this).fun();
  }
}; 
```
原因是它不是当前对象在调用这个函数，而是一个对象的副本在调用。

正确做法：
```
class Base{
  virtual void fun() {...}
};
class Derived : public Base{
  virtual void fun(){
      Base::fun();
  }
}; 
```
3. `绝对要避免的`是一连串dynamic_cast(s)，因为这样产生出来的代码又大又慢，并且基础不稳，每次class继承体系有改变，这些转型代码都得检查是否需要修改。这样的代码总是以某些“基于virtual函数调用”的东西取代。
4. 总之，尽量避免转型，如果必须要转型，宁用新式转型，因为这样也好辨别。

# Item 28：避免返回handles(包括reference，指针，迭代器)指向对象内部成分
1. 原因：
   * 如果有如下函数：
 
        	ClassName& foo() const{return anotherClass->member;}
		这样将使得封装性被破坏。
	* 假设等号右边是一个返回对象的方法A，然后该返回对象调用其他方法B返回给等号左边的对象，这样使得当语句执行完后，等号左边的对象指向了空。

# Item 29：为“异常安全”而努力是值得的
这一块没怎么研究过，暂时略过

# Item 30：透彻了解inlining的里里外外
1. inline只是对编译器的一个申请，不是强制命令
2. 函数被定义在class定义式内，是一种隐喻inline方式
3. 由于friend函数也可定义在class内，这样一来friend函数也被隐喻声明为inline。
4. 表面看似inline的函数是否真inline，取决于构造的环境和编译器。
5. 将构造和析构写为inline是很糟糕的做法，因为假设一个派生类构造即使看着是“空”的，其内部会调用基类构造，然后调用基类成员变量的构造。
6. 一开始先不要将任何函数声明为inline，或至少将inline的施行范围局限在那些“一定成为inline”或“十分平淡无奇”的函数身上。
7. 将inline限制在小型，被频繁调用的函数身上，可使日后调试过程和二进制升级更加容易，也可使代码膨胀问题最小化，提升程序运行速度。

# Item 31：将文件间的编译以存关系降至最低
提升编译速度