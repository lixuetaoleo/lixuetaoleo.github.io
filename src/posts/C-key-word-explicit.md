---
title: C++ keyword -- explicit
titleImage:
categories:
  - Software Development
date: 2019-10-18 16:44:55
tags: 
  - C++
---
## 1. 作用

指定构造函数或转换函数 (C++11 起)为显式，即它不能用于隐式转换和复制初始化。

### - 隐式转换简单解释

C/C++中基本类型的自动类型转换是经常见到的情形， 例如下边的代码：
``` 
int i ;
float j ;
......
j = i;
```
其实，这就是一种隐式类型转换。当把整形的 i 赋值给浮点型的 j 时，编译器自动完成了转换。 有了隐式类型转换，我们少写了很多代码，省去了不少麻烦。

### - 复制初始化简单解释

```
T object = other;	(1)	
T object = {other} ;	(2)	(C++11 前)
f(other)	(3)	
return other;	(4)	
throw object;
catch (T object)   (5)	
T array[N] = {other};	(6)	
```
以上都属于复制初始化

## 2. 隐式转换带来的隐患

C++的类可以看作一种用户自定义的数据类型。既然和基本数据类型一样，C++类也是一种数据类型，那么让C++类支持隐式类型转换就成了一种自然而然的想法。

在C++规则中, 可以调用单个实参的构造函数定义了从形参类型到该类类型的一个隐式转换。
例如下边的代码：
```
class Student
{
public: 
    Student() { }
    Student(int age) { }
};

class Teacher
{
public:
    Teacher() { }
    Teacher(int age, string name="unkown") { }  
};
```
Student类的构造函数仅需要一个实参就能构造对象。Teacher类的构造函数有两个参数，但是由于第二个参数提供了默认值，也可以通过一个参数构造对象。因此，按照C++规则，这两个类的构造函数都实现了隐式转换功能。
所以下边的代码也就完全可以编译通过了：
```
Student foo;
Teacher bar;

foo = 12;    //隐式转换
bar = 40;    //隐式转换
```
上述的隐式类型转换同样由编译器完成，编译器通过构造函数构造出一个临时对象，并将其复制为foo和bar。

这样用起来似乎和基本类型的自动转换一样的爽快， 省去了好多代码。然而，凡事总是有两面性，越是便利性的东西，往往越容易犯错。你怎么能够总是保证编译器帮你构造出来的代码就是你想要实现的逻辑呢？一旦出现代码拼写错误，代码实现和自己的逻辑不符，而编译器又不报错，Debug时将加倍地费时费力。

关于隐式类类型转换的缺点，网上流传比较广泛的是如下的两个例子：
### 1. 拼写错误
```
Array<int> a[10];
Array<init>b[10];
for(int i=0;i<10;i++) {
     if(a==b[i]) {        //原意是a[i],现在出现了错误
                              //发生点什么
      }
}
```
这个例子中省略了一部分代码，原文请参阅参考文档[1].

简单讲，由于Array类中定义了一个可以只接收一个整形参数的构造函数， 因此在if(a==b[i])发生拼写错误的情况下， 编译器并不会报错，而是自动的从b[i]隐式转换出一个Array类型的临时对象，并同a进行比较。

### 2. 逻辑错误
```
// A simple class
class A {};

// Another simple class with a single-argument constructor for class A
class B
{
public:
    B() {}
    B(A const&) {}
};

// A function that expects a 'B'
void f(B const&) {}

int main()
{
    A obj;
    f(obj); // Spot the deliberate mistake
}
```
这个例子说逻辑错误似乎有点牵强，因为有人会讲，我本来的逻辑就是要通过A类的对象构造出来一个B类的对象，然后给f()函数使用。好吧，如果是这样，我们至少可以说逻辑不够严谨吧。至少大部分读代码的人会感到诧异，我们要让f()函数要处理的是一个B类对象，但是却给了它一个A类的对象作为参数，而且代码编译是完全没有问题的。

之所以代码编译不出问题是因为B类包含了一个可以接受A类对象引用值作为参数的构造函数，满足了隐式转换规则。所以当我们把A类对象obj作为参数送给f()函数时，编译器调用了隐式转换规则，生成了一个临时的B类对象并传递给f()函数。上述例子的完整表述，可以参阅参考文档[2].

你可能会想，隐式转换也太强大了吧，问题是，你是否能够保证每次都是你有意写出的代码，而不是无心插柳？

## 3. Tips from Google
关于隐式类型转换的优缺点，Google C++编程规范有详细的描述。 其优点就是语法简洁，省事儿。缺点就比较多了：

- 容易隐藏类型不匹配的错误；
- 代码更难阅读；
- 接收单个参数的构造方法可能会意外地被用做隐式类型转换；
- 不能清晰地定义那种类型在何种那个情况下应该被隐式转换，从而使代码变得晦涩难懂。

Google的结论就是``可接收单个参数的构造函数必需要加上explicit标记，禁止隐式类类型转换 (复制和移动构造函数除外，因为这两者不执行类型转换）。``

按照Google编程规范，上述例子中可接收单个参数的构造函数都应该声明为如下形式。
```
class Student
{
public: 
    Student() { }
    explicit Student(int age) { }
};

class Teacher
{
public:
    Teacher() { }
    explicit Teacher(int age, string name="unkown") { } 
};
```
这样将会禁止类类型的隐式转换，编译器在编译类似代码时会直接报错，提醒开发人员检查自己的代码是否符合逻辑。

## 参考
1. [cppreference](https://zh.cppreference.com/w/cpp/language/explicit)

2. [VinceZeng的简书文章](https://www.jianshu.com/p/2e0fcb444cb4)
