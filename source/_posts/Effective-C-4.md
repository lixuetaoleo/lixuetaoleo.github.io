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

    - 传统做法：在operator=最前面加一个“证同测试(identity test)”检验：

          fsa
      优点:
      
      缺点：
    - 调整语句顺序：

          f 
      优点:
      
      缺点：
    - copy and swap技术：
          
          ffff
      优点:
      
      缺点：

## Item 12：复制对象时勿忘其每一个成分
1. 