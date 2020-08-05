---
title: Effective C++ 4
categories:
  - Software Development
date: 2019-11-06 20:46:03
tags:
  - C++
---
## Item 10：令 operator= 返回一个reference to *this
1. 在重载"+="和"="操作符时，应遵循返回*this的reference的“协议”(无强制性)，以应对连等情况出现。

## Item 11：在 operator= 中处理“自我赋值”
1. 注：自我赋值不但包括明显的自我赋值(如w = w)，还包括潜在的自我赋值(比如a[i] = a[j], *pi = *pj等).甚至一个指向子类对象的基类指针和子类对象指针也是自我赋值。
2. 处理“自我赋值”的三种方案：

    假设如下两个类：

        class Bitmap{...};
        class Widget{
          ...
        private:
          Bitmap *pb;
        };
      一份不安全的operator=实现版本
        
        Widget& Widget::operator=(const Widget& rhs){
          delete pb;
          pb = new Bitmap(*rhs.pb);
          return *this;
        }
      这里自我赋值的问题：*this和rhs有可能是同一个对象，delete pb时可能将rhs的pb销毁。
      
      以下是三种方案
    - 传统做法：在operator=最前面加一个“证同测试(identity test)”检验：

          Widget& Widget::operator=(const Widget& rhs){
            if(*this == &rhs) return *this;
            delete pb;
            pb = new Bitmap(*rhs.pb);
            return *this;
          } 
      优点：简单，行得通
      
      缺点：无“异常安全性”，如果new Bitmap有异常，Widget会持有一个指针指向一块被删除的Bitmap，且该指针无法被删除或者安全读取。
    - 调整语句顺序：

          Widget& Widget::operator=(const Widget& rhs){
            Bitmap *pOrig = pb;
            pb = new Bitmap(*rhs.pb);
            delete pOrig;
            return *this;
          } 
      优点：无“异常安全性”
      
      缺点：不是处理这个问题的最高效方法
    - copy and swap技术：
          
          //不具有清晰性，暂略。
      优点:
      
      缺点：

## Item 12：复制对象时勿忘其每一个成分
1. 如果为class添加一个成员变量，必须同时修改coping函数。(同时也需修改class所有的构造函数以及任何非标准形式的operator=，如+=)
2. 当一个类是子类并且为其撰写copying函数时，必须很小心地也复制其父类成分。由于成员变量一般是private，所以无法直接访问它们，应该让子类地copying函数调用相应地父类函数：
   
   - 构造时在member initialization list调用父类构造函数。
   - 在重载operator=时调用BaseClass::operator=(rhs);
3. 拷贝构造和拷贝赋值互相调用都是不合理的，理由如下：
    
    - 拷贝赋值操作符调用拷贝构造就像在试图构造一个已经存在的对象。
    - 拷贝构造函数不能调用拷贝赋值，因为构造函数用来初始化新对象，而赋值操作符只实行于已初始化对象身上。
4. 如果发现拷贝构造和拷贝赋值中有相近代码，消除这些重复代码的做法是建立一个新的成员函数给两者调用，通常这个函数是private并且命名为init。