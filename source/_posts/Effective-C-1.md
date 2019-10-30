---
title: Effective-C++-1
categories:
  - Software Development
date: 2019-10-30 23:03:35
tags:
  - C++
---
# Item 1：视C++为一个语言联邦
1. 将C++视为由以下几部分组成的一个“语言联邦”：
   - C。区块(blocks), 语句，预处理器，内置数据类型，数组，指针等。
   - Object-Oriented C++。classes（包括构造和析构），封装，继承，多态，虚函数（动态绑定）等。
   - Template C++。泛型编程。
   - STL。容器，迭代器，算法以及函数对象（Function Objects）。
2. 请记住：
   - C++高效编程守则视状况变化，取决于使用C++哪部分。

# Item 2：尽量以const，enum，inline替换#define
1. #define不被视为语言的一部分，#define从未被编译器看见，在编译器开始处理源码之前就已经被预处理器移走了。解决之道是以一个常量替换。比如把#define ASPECT_RATIO 1.653替换为：
```
    const double AspectRatio = 1.653
```
2. 常量替换#define，两种特殊情况
  - 常量指针。因为常量定义式通常被放在头文件内，因此有必要将指针（不只是指针所指之物）声明为const。比如若要在头文件定义一个常量char*-based字符串，得这样写：
```
    const char* const authorName = "Li";
```
  这样写有些复杂。所以常用std::string代替：

        const std::string authorName("Li");
    
  - class专属常量。为将常量作用域限制在class内部，必须让其成为class的一个成员变量，而且为确保它至多有一份实体，必须让它成为一个static成员。
```
  class Foo{
  private:
      static const int num = 5; //常量声明式
      int scores[num];
  };
```
  注意：上面的是声明式而不是定义式。通常C++都回要求任何东西提供一个定义式，但是如果它是一个class专属的static且为整数类型（int，char，bool），则进行特殊处理。只要不取它们地址，只有声明式没有定义式也是ok的。但是如果你要对某个class的专属常量取地址，或者如果你无定义式编译不通过，则按如下方法提供定义式：
  const int Foo::num;它因为声明时获得了初值，因此定义式可以不再设初值。
  `无法用#define创建class专属常量，因为它不重视作用域`。

  如果编译器不允许“static整数型class常量”完成“in class初值设定”，可以用“enum hack”：即一个枚举类型的数值可被当作ints使用。例：
  ```
  class Foo{
  private:
      enum{num = 5};
      int scores[num];
  };
  ```
  这样一来，num就只是成为了5的一个记号。
  
  enum hack从行为方面更像#define而不是const。它也具有实用主义。

3. 请记住：
   - 对于单纯常量，用const对象或者enums替换#define。

# Item 3：尽可能使用const
1. const摆放位置小结：
   - const出现在星号左侧，表示被指物是常量；如果出现在星号右边，则指针自身是常量；出现在星号两侧，被指物和指针两者都是常量。
2. 令函数返回一个常量值，往往可以降低因客户错误而造成的意外，而又不至于放弃安全性和高效性。例子：重载了一个操作符*，但是客户调用的时候手滑，写成了if(a*b = c)，而其本意是判断，因此加上const可以避免无意义的动作。总之，除非有需要改动参数或者local对象，否则将函数声明为const。
3. 避免代码重复的安全做法--令non-const function调用const function。在C++中，函数可以仅通过const来进行重载，因此如果const版本的函数和非const版本的函数大部分内容都一样，可以令nonconst版本调用const版本。例子：
```
  class TextBlock{
  public:
      ...
      const char& operator[](std::size_t position) const{
        ...
        return text[position];
      }
      char& operator[](std::size_t position){ //一共进行两次转型
        return const_cast<char&>( //将op[]返回值的const除去
          static_cast<const TextBlock&>(*this)[position] //为*this加上const以调用const op[]
        );
      }
  };
```

注意：const成员函数调用nonconst版本是错误的，因为对象有可能因此被改动。