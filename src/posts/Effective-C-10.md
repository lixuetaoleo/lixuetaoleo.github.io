---
title: Effective C++ 10
titleImage:
categories:
  - Software Development
date: 2019-12-12 23:18:31
tags:
  - C++
---
# Item 38：通过复合塑造出has-a或"根据某物实现出"

1. composition有许多同义词：layering(分层)，containment(内含)，aggregation(聚合)和embedding(内嵌)
2. 复合意味着has-a或者is-implemented-in-terms-of。
3. 比如你因为std::set空间复杂度大想自己写一个Set，决定用list当底层，但是Set肯定是不能继承list的，因为list允许重复元素而Set不允许，它们不是is-a的关系。此时应该用Set里private定义一个list。

# Item 39：明智而审慎地使用private继承

1. private继承的两条规则：
   * 如果class之间继承关系是private，编译器不会自动将一个子类对象转换为一个基类对象。因此子类对象无法调用父类的方法。
   * 由private继承而来的所有成员，在子类中都会变成private属性，即使它们在父类中原本是protected或者public

2. private继承纯粹只是一种实现技术；它意味着implemented-in-terms-of，与复合的意义一样，但是`尽可能使用复合，必要时才使用private继承`
3. C++中模拟JAVA final的方法：

		class Widget{
		private:
			class WidgetTimer: public Timer{
			public:
				virtual void onTick() const;
				...
			};
			WidgetTimer timer;
			...
		};
	这样一来，widget的子类将无法取用widgettimer，因此无法继承它或者重新定义它的virtual函数

4. private继承主要用于“当一个意欲成为子类想访问一个意欲成为父类的protected成分，或为了重新定义一个或者多个virtual函数”
5. 有一种“激进”的情况涉及空间最优化，可能会促使选择“private”继承而不是继承加复合：

		class Empty{}

		class A{
		private:
			int i;
			Empty e;
		};
	
	在上面的代码中，Empty由于没有成员变量，其大小理论上为0，A类的大小也等于int的4个字节。但是实际上sizeof(A) > sizeof(int)。原因：面对大小为0的独立对象，C++通常会安插一个char到空对象内，使得空对象大小为1；然后由于内存对齐，可能使得复合了这个空对象的对象不止获得一个char大小。

	如果A private继承Empty，sizeof(A) == sizeof(int)。
	这就是所谓的EBO(empty base optimization，空白基类最优化)。

	但是在现实情况中，大多数class并非empty，因此EBO很少成为private继承的正当理由。大多数继承相当于is-a，这里指的是public继承而非private继承。而且复合和private继承意义一样，但是好理解，因此应该用复合。

# 40：明智而审慎地使用多重继承
1. 多重继承比单一继承复杂。它可能导致新的歧义性，以及对virtual继承的需要。
2. virtual继承会增加大小，速度和初始化(及赋值)复杂度等成本。如果virtual base class不带任何数据，将是最具实用价值的情况
3. 多重继承的确有正当用途。其中一个情节涉及“public继承某个接口类”和“private继承某个协助实现的class”的两相组合。
