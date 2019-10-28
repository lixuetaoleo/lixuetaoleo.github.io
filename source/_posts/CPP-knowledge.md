---
title: CPP knowledge
categories:
  - Software Development
date: 2019-10-25 15:01:54
tags:
  - C++
---
总结一下遇到的C++知识点

1. 编译error: expected identifier before numeric constant
   
   原因：c++的类体中，方法以外的区域可以初始化，只是不能用括号初始化，要用赋值初始化！
   
   ```
   class A{
     std::vector<std::string> v(9);  //error,expected identifier before numeric constant
     std::vector<std::string> v = std::vector<std::string>(5); //OK, it's a private member.
   public:
     void test(){} //just a demo for representing out of function.
   };
   ```
   但是在C++11以前，需要先声明变量，然后再初始化他们（比如在ctor中）
   ```
   class Foo {
    vector<string> name;
    vector<int> val;
   public:
    Foo() : name(5), val(5,0) {}
   };
   ```

2. vector的emplace_back()不能传入{1,2,3}这样的initializer list，push_back可以。
    
    emplace_back的形参是可变参数。
    ```
    template< class... Args >
    reference emplace_back( Args&&... args );
    ```
    因此当emplace_back({1,2,3})这样调用时，等于是只传入了一个参数，而Args无法推导出{1,2,3}的类型(C++中没有这种类型的数据)，它是一个用大括号括起来的init-list，可以在某些类型的初始化中使用，但都需要知道初始化的类型。
    所以诸如std::vector temp = {1,2};然后传入emplace_back这样是ok的，因为vector的构造可以匹配得到这种init-list，但是如果是自己写的一个类，并且该类的构造没有匹配这种init-list，这样也是不行的。
    
    虽然上面std::vector temp = {1,2}然后传入emplace_back这样是ok的，但是不建议这样做，因为如果这样用emplace_back的话，效果和直接用push_back是一样的了，即创建了一个临时变量然后再使用移动构造，这和push_back的思想是一样的。而emplace_back比push_back效率高的原因就是因为emplace_back是把传入的元素就地构造，只调用一次构造函数，而push_back是先把传入的元素构造出一个临时变量，然后再调用移动构造把这个临时变量赋到原先的vector。
3. 如果你已经知道，某个变量在之后就不会在用到了，这时候可以选择显式的移动，可以使用
static_cast<X&&>
将对应变量转换为右值，或者通过调用
std::move()
函数来做这件事：
   ```
   X x1;

   X x2=std::move(x1);

   X x3=static_cast<X&&>(x2);
   ```
4. C++的三种访问权限与三种继承方式
   
   三种访问权限：
   1. public: 对本类可见，对子类可见，对调用方(对象)可见。
   2. protected: 对本类可见，对子类可见，对调用方(对象)`不`可见。
   3. private: 对本类可见，对子类`不`可见，对调用方(对象)`不`可见。
   
   三种继承方式：
   
   1. `三种继承方式不影响子类对父类的访问权限，子类对父类只看父类的访问控制权。`
   2. `继承方式是为了控制子类(也称派生类)的调用方(也叫用户)对父类(也称基类)的访问权限。`
   3. `public、protected、private三种继承方式，相当于把父类的public访问权限在子类中变成了对应的权限。` 如protected继承，把父类中的public成员在本类中变成了protected的访问控制权限；private继承，把父类的public成员和protected成员在本类中变成了private访问控制权。
5. 直接初始化和拷贝初始化是否有底层实现上的差别？比如，T a(b) 和 T a = b，假如不考虑编译器所做的优化，这两种语句是否会生成同样的机器指令？或者说硬件层面的操作差别？
   - 是一样的。不过区别是，如果T的构造函数标记了explicit，那么T a = b;会有语法错误
   - T a = b 就是 T a(b) 的语法糖, 区别就是 T a = b 要求不是 explicit.
   - 有 T a = b这样的语法 是因为C 的原因。