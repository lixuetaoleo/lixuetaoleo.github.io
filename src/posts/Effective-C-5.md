---
title: Effective C++ 5
categories:
  - Software Development
date: 2019-11-07 19:39:33
tags:
  - C++
---
## Item13：以对象管理资源
1. 对于常见的资源，如动态分配内存，文件描述符，互斥锁，图形界面中的字型和笔刷，数据库连接，sockets等，不再使用它们时，必须交还给系统。
2. 虽然可能考虑到了delete，如下：
```
void f(){
  Investment *pInv = createInvestment();
  ...
  delete pInv;
}
``` 
但是由于在...那里因为某些原因return了，将造成资源泄漏。
因此需要将资源放进对象里，当控制流离开f，该对象的析构函数会自动释放那些资源。

3. “以对象管理资源”的观念常被称为“资源取得时机便是初始化时机”(Resource Acquisition Is Initialization; RAII)
4. 常用的RAII是shared_ptr，引用计数型智能指针，使用它，用户不用再考虑delete问题。
5. shared_ptr内部使用的是delete而非delete[]，因此不要在shared_ptr上构造数组(但从c++17开始，shared_ptr也支持数组形式了)。

## Item 14：在资源管理类中小心copying行为
1. 在一个RAII对象尝试复制时，通常采取以下两种做法：
   
     - 禁止复制。如果复制动作对RAII class不合理(比如说mutex)，那么应该禁止它。具体做法：对象的类private继承Uncopyable类。
     - 对底层资源祭出“引用计数法”。有时候我们希望保有资源，直到它的最后一个使用者（某对象）被销毁。这种情况下就是复制RAII对象时，将该资源的“被引用数”递增，shared_ptr就是这种做法。

## Item 15：在资源管理类中提供对原始资源的访问
1. 假设一个函数的参数是raw pointer，但是其实参却是一个智能指针(一个RAII对象)，这样是不行的。可以利用get()方法返回智能指针内部的原始指针(的复件)。
2. 还可以用隐式方法返回原始资源(operator Classname() const{return var;})，但是一般而言用显式方法比较安全。

## Item 16：成对使用new和delete时要采取相同形式
1. 即new -- delete, new[] -- delete[]
2. 避免诸如typedef std::string AddressLines[4]然后std::string *p1 = new AddressLines; 但是delete p1的情况发生，最好尽量不要对数组形式采取typedef。

## Item 17：以独立语句将newed对象置入智能指针
假设如下函数：
```
int priority();
void processWidget(std::shared_ptr<Widget> pw, int priority);
```
如果调用它时采用了
```
processWidget(new Widget, priority());
```
这种形式，无法通过编译。因为shared_ptr构造时需要的一个raw pointer是explicit构造函数，不支持复制初始化，所以调用应该按如下形式：
```
processWidget(std::shared_ptr<Widget>(new Widget), priority());
```
但是按上面的形式写，可能导致资源泄漏。

分析：
上述的调用函数，在调用之前，编译器必须创建代码，做以下三件事：

1. 调用priority
2. 执行“new Widget”
3. 调用shared_ptr构造函数

但是在编译时，C++执行次序弹性很大（与C#和Java有很大不同），因此可能出现以下的次序（虽然new widget肯定是在shared_ptr的ctor之前调用）：

1. 执行“new Widget”
2. 调用priority
4. 调用shared_ptr构造函数

万一在调用priority时发生了异常，在此情况下new widget返回的指针将会遗失，造成资源泄漏。

为避免这类问题，使用分离语句：

1. 创建widget
2. 将它置入一个智能指针内
3. 将智能指针传入processWidget

```
std::shared_ptr<Widget> pw(new Widget);
processWidget(pw, priority());  //这样就防止了资源泄漏问题
```