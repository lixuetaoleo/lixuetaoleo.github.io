---
title: Effective C++ 3
titleImage:
categories:
  - Software Development
date: 2019-11-04 23:25:43
tags:
  - C++
---
# Item 7：为多态基类声明virtual析构函数
1. C++明白指出，如果派生类的对象被一个基类指针指向然后删除，而该基类带着一个非虚析构函数，其结果未有定义——但实际执行时通常发生的是对象的derived成分没被销毁。这种“局部销毁”将造成资源泄露，败坏之数据结构（不太清楚这里什么意思）。
2. 消除上述现象的做法就是给基类加一个virtual的析构函数，然后同样的删除一个基类指针指向的派生类对象时，就会销毁整个对象，包括整个派生类成分。
3. `任何class只要带有virtual函数，那么几乎确定的是也应该有一个virtual析构函数！`
4. 如果一个类不含virtual函数，那么说明它并不意图被用作一个基类，如果一个类不被用作基类而令其析构函数为virtual，是一个馊主意！理由如下：
   
   假设一个类如下所示：
   ```
   class Point{
   public:
      Point(...);
      ~Point();
   private:
      int x,y;
   };
   ```
   假设int占用32位，那么该类的大小是64bits，但是如果此时将析构函数弄成virtual，形势发生了变化。

   要实现virtual函数，对象必须携带某些信息（具体是什么不重要），这份信息是由一个vptr(virtual table pointer)指针指向。vptr指向一个由函数指针构成的数组，称为vtbl(virtual table)；每一个带有virtual函数的class都有一个相应的vtbl。当对象调用virtual函数时，实际被调用的函数取决于该对象的vptr所指的那个vtbl--然后编译器在其中寻找适当的函数指针。

   所以如果将Point的析构弄为virtual，Point的大小将从64bits（两个int）增加至96bits（两个int加一个vptr）（在64位机器中占用更多！），造成对象增加50%~100%！使得原本point对象能塞进64bit的缓存器而不再能塞进去。

   `心得`: 只有当class内至少含有一个virtual函数才为它声明virtual析构函数。
5. 不要继承标准库的容器或带有non-virtual析构函数的class。
6. 对于一个抽象类含有纯虚析构函数，必须为这个纯虚析构函数提供一份定义，防止链接警告！因为析构时自底向上，当该抽象类的析构函数被调用时，如果没有定义函数，就会有警告出现。
7. 并非所有的基类其设计目的都是为了多态：
   - 标准string和STL容器都不被设计为基类使用，更不用提多态（这也是为什么不要继承标准库容器或string的原因）。
8. 某些class的设计目的是作为基类使用，但不是为了多态用途：
   - 比如之前提到的uncopyable类，它们并非被设计用来“经由base class接口来处理derived class对象”，因此它们不需要virtual析构函数。

# Item 8：别让异常逃离析构函数
1. 当有多个异常同时存在的情况下，程序将结束执行或者导致不明确行为。C++不喜欢析构函数吐出异常！
2. 如果一个被析构函数调用的函数可能抛出异常，析构函数应该捕捉任何异常，然后吞下它们或结束程序。
3. 如果客户需要对某个操作函数运行期间抛出的异常作出反应，那么class应该提供一个普通函数（而非在析构函数中）执行该操作。

# Item 9：绝不在构造和析构过程中调用virtual函数
1. 假设一个基类在构造时调用了其一个纯虚方法，该纯虚方法在派生类进行了实现，然后其派生类在创建对象时，会出现错误。因为构造时是自顶向下，最开始调用的是基类构造，并且类型也是base class的类型，基类构造时调用那个纯虚方法将出错。
2. 也要警惕在基类构造调用了一个non-virtual方法，但是该non-virtual方法调用了一个virtual方法的陷阱。。。
3. 解决方法：
   将原本在基类的那个virtual方法改为non-virtual，然后要求派生类构造必须传递必要信息给基类构造，然后那个构造函数就能安全的调用non-virtual函数了。
   即“令派生类将必要的构造信息向上传递至基类构造函数”。
