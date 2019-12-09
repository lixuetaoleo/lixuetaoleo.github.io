---
title: Effective C++ 9
categories:
  - Software Development
date: 2019-12-09 19:10:37
tags:
  - C++
---
# Item 32：确定你的public继承塑模出is-a关系

1. public继承是"is-a"关系，牢记这条规则
2. 适用于base class上的每一件事情也一定适用于derived class，因为每一个derived class对象也都是一个base class对象。

# Item 33：避免遮掩继承而来的名称
假设有如下例子：
```
class Base{
private:
	int x;
public:
	virtual void mf1() = 0;
	virtual void mf1(int);
	virtual void mf2();
	void mf3();
	void mf3(double);
	...
};

class Derived: public Base{
public:
	virtual void mf1();
	void mf3();
	void mf4();
};

Derived d;
int x;
...
d.mf1(); // 没问题,调用Derived::mf1
d.mf1(x); // 错误,因为Derived::mf1遮掩了Base::mf1
d.mf2(); // 没问题,调用Derived::mf2
d.mf3(); // 没问题,调用Derived::mf3
d.mf3(x); // 错误,因为Derived::mf3遮掩了Base::mf3
```

解决方法

```
在Derived Class中：
class Derived: public Base{
public:
	using Base::mf1;  // 让Base Class内名为mf1和mf3的所有东西
	using Base::mf3; // 在Derived作用域内都可见(并且public)
	virtual void mf1();
	void mf3();
	void mf4();
};
```

总结: 如果你继承base class并加上重载函数，而又希望重新定义或覆写其中一部分，那么必须为那些原本会被遮掩的每个名称引入一个using声明式，否则将产生遮掩

有时你不想继承base class的所有函数，是可以理解的，但是，在public继承下，绝对不可能发生！！！

在private继承下，继承部分函数的做法：加个转交函数(forwarding function)
```
class Base{
public:
	virtual void mf1() = 0;
	virtual void mf1(int);
	...
};

class Derived: private Base{
public:
	virtual void mf1() //转交函数暗自成为inline函数
	{Base::mf1();}
};

...
Derived d;
int x;
d.mf1(); // 调用的是Derived::mf1
d.mf1(x); // Base::mf1被遮掩
```

# Item 34：区分接口继承和实现继承
1. 声明一个纯虚函数的目的是为了让派生类只继承函数接口
2. 非纯虚函数目的是让派生类继承该函数的接口和缺省实现
3. 如果有矛盾：支持接口和缺省应该分开，但是反对用不同的函数分别提供接口和缺省实现(因为会有class命名空间污染问题)，做法是利用“纯虚函数必须在派生类中重新声明，但是它们也能拥有自己的实现”这一特性。
```
class AirPlane{
public:
	virtual void fly(...) = 0; //pure virtual
};

void AirPlane::fly(...){
	//缺省行为
}

class ModelA: public Airplane{
public:
	virtual void fly(...){
		AirPlane::fly(...); //调用缺省行为,必须显式调用
	}
	...
};

class ModeB: public Airplane{
	virtual void fly(...);
};

void ModelB::fly(...){
	//实现自己的版本
}
```
4. 声明非虚函数的目的是为了令派生类继承函数的接口及一份强制性实现。
5. 由于非虚函数代表的意义是不变性(invariant)和凌驾特异性(specialization)，所以它绝不该在派生类中被重新定义！！！(详见ITEM 36)
6. 总结：

	* 纯虚函数只具体指定接口继承
	* 非纯虚函数具体指定接口继承以及缺省实现继承
	* 非虚函数具体指定接口继承以及强制性实现继承

# Item 36：绝不重新定义继承而来的non-virtual函数
假设以下例子:
```
class B{
public:
	void mf();
	...
};

class D{
public:
	void mf(); //遮掩了B::mf,见item 33
	...
}

D x;
B* pB = &x;
D* pD = &x;
pB->mf(); //调用B::mf()
pD->mf(); //调用D::mf()
```
结果理应是pB和pD都通过对象x调用mf，但事与愿违

原因：non-virtual函数是静态绑定，意思是由于pB被声明为一个pointer-to-B，通过pB调用的non-virtual函数永远是B所定义的版本，即使pB指向的是一个派生类的对象。

但是virtual函数是动态绑定，如果mf是个virtual函数，无论通过pB或pD调用mf，都会导致调用D::mf,因为pB和pD真正指的都是一个类型为D的对象。

# Item 37：绝不重新定义继承而来的缺省参数值
