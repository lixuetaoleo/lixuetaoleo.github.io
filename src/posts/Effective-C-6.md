---
title: Effective C++ 6
categories:
  - Software Development
date: 2019-11-09 19:28:31
tags:
  - C++
---
## Item 18：让接口容易被正确使用，不易被误用
1. 要保证这条原则，首要考虑客户可能做出什么样的错误。
2. 除非有更好的理由，否则应该尽量让自己写的type的行为与内置types一致。比如说a, b都是ints，那么对a*b不合法，所以自己写的type也应该如此。总之，如果遇到什么疑问，可以拿int来做范本。
3. 为了防止客户使用智能指针，可以先发制人，令要返回指针的函数就返回一个智能指针。
4. 同样的，为了防止客户利用delete来析构智能指针，可以在构造智能指针的时候传入一个删除器。

## Item 19：设计class犹如设计type
1. 在设计一个class时，要按照设计type去考虑：

     - 新type对象如何被创建和销毁
     - 对象的初始化和对象的赋值该有什么样的差别
     - 新type的对象如果被passed by value，意味着什么
     - 什么是新type的“合法值”
     - 新type需要配合某个继承图系吗
     - 新type需要什么样的转换
     - 什么样的操作符和函数对此新type而言是合理的
     - 什么样的标准函数应驳回
     - 谁该用新type的成员
     - 什么是新type的“未声明接口”
     - 新type有多么一般化
     - 真的需要一个新type吗？因为如果只是定义新的派生类以便为既有的类添加机能，说不定单纯定义一个或多个非成员函数或者模板，更能达到目标。

## Item 20：以pass by reference to const替换pass by value
1. pass by value的两个问题：

      - 构造和析构的代价太大
        
        对于如下两个类：
        ```
        class Person{
        public:
            Person();
            virtual ~Person();
            ...
        private:
            std::string name;
            std::tring address;
        };

        class Student : public Person{
        public:
            Student();
            ~Student();
            ...
        private:
            std::string schoolName;
            std::string schoolAddress;
        };

        bool validateStudent(Student s); //以pass by value方式接受参数
        Student Plato;
        bool isValidate = validateStudent(Plato);//调用函数
        ```
        对于该例子，以pass by value方式传递一个Student对象会导致调用一次Student构造函数，一次Person构造函数，四次string的构造函数。当函数内的那个Student副本被销毁，又要调用每一个构造对应的析构，所以这次调用整体成本是“6次构造6次析构”
      - 对象切割问题

        ```
        class Window{
        public:
            ...
            std::string name() const;
            virtual void display() const;    
        };
        class WindowWithScrollBars : Window{
        public:
            ...
            virtual void display() const;    
        };  

        void printNameAndDisplay(Window w){
          std::cout<<w.name()<<std::endl;
          w.display();
        }

        WindowWithScrollBars wwsb;
        printNameAndDisplay(wwsb);
        ```
        以上操作会导致传入print...函数的w对象被构造为Window对象，无论传过来的对象原本是什么类型，所以进而调用window类里的display()。

        但是以by reference to const传递，就能解决这个问题，传过去什么对象就是什么对象。
2. 在C++底层，reference就是指针，因此pass by reference通常意味着真正传递的是指针，所以对于内置类型(以及STL迭代器和函数对象)，pass by value比reference效率要高一些。

## Item 21：必须返回对象时，别妄想返回其reference
1. 对于如下代码：
    ```
    const Rational& operator* (const Rational& lhs, const Rational& rhs){
      Rational result(lhs.n * rhs.n, lhs.d * rhs.d)
      return result;
    }
    ```
    当函数返回一个reference(或者指针)指向result，但result是个local对象，而local对象在函数退出前就被销毁了！
2. 一个“必须返回新对象”的正确写法：让函数返回一个新对象
    ```
    inline const Rational operator* (const Rational& lhs, const Rational& rhs){      
      return Rational(lhs.n * rhs.n, lhs.d * rhs.d);
    }
    ```
    这样做需承担返回值构造和析构的成本，但是对于上面的错，这代价也是微乎其微了。

## Item 22：将成员变量声明为private
原因：

1. 为了语法一致性。把成员都放入private，客户通过对象访问成员变量的方法就是成员函数了，就不用考虑访问变量还是函数，纠结要不要带括号的问题。
2. 对成员变量的处理有更精确的控制。可以写出禁止访问，只读，读写，甚至“只写”等权限。
3. 封装性。如果通过函数访问成员变量，那么今后可改以某个计算替换这个成员变量，而class的客户也不会知道class内部实现发生了变化。而对于protected，其封装性并不比public成员变量高，理由如下：假设成员变量放在public里，最终取消了它，所有使用它的客户代码都会被破坏，而那是一个不可知的大量。但是对于protected变量，最终取消了它，所有使用它的派生类都会被破坏，也是一个不可知的大量。因此protected封装性依旧缺乏。

总结

从封装的角度看，其实只有两种访问权限：private(提供封装)和其他(不提供封装)
