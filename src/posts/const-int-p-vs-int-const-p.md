---
title: const int *p vs int * const p
titleImage:
categories:
  - Software Development
date: 2019-10-24 20:29:08
tags:
  - C++
---
今天终于把这两者彻底弄懂了。。。

其实非常简单

const int *p 这里的const的是 *p，即 *p不能被修改

而int * const p这里const的是p，即p不能再被用来指向其他变量了。

e.g.
```
int i = 0;
const int *p = &i;
std::cout << "i: " << i << " *p: " << *p << std::endl; //i: 0 *p: 0
i = 2;
std::cout << "i: " << i << " *p: " << *p << std::endl; //i: 2 *p: 2
*p = 3; //invalid
int j = 4;
p = &j; // *p: 4

int i = 0;
int * const p = &i;
std::cout << "i: " << i << " *p: " << *p << std::endl; //i: 0 *p: 0
i = 2;
std::cout << "i: " << i << " *p: " << *p << std::endl; //i: 2 *p: 2
*p = 3;
std::cout << "i: " << i << " *p: " << *p << std::endl; //i: 3 *p: 3
int j = 4;
p = &j; //invalid
```
