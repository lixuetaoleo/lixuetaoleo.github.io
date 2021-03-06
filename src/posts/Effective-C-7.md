---
title: Effective C++ 7
titleImage:
categories:
  - Software Development
date: 2019-11-13 19:58:14
tags:
  - C++
---
## Item 23：宁以non-member、non-friend替换member函数
1. 封装性的“粗糙测量”：愈多函数可访问对象内的数据，数据的封装性就愈低
2. 由上一条，member函数的封装性比non-member函数低。
3. 友元函数对class private成员的访问权力与member函数相同，因此两者对封装的冲击力度也相同。
4. 只因在意封装性而让函数“成为class的non-member”并不意味它“不可以是另一个class的member”。可以令这些函数称为一个工具类的static member函数，只要它不是其类的一部分（或者friend），就不会印象该类private成员的封装性。
5. 更一般地做法是把这些non-member函数与它需要的那个类放在同一个namespace下
```
	namespace WebBrowserStuff{
		class WebBrowser{...};
		void clearBrowser(WebBrowser &wb);
		...
	}
```
6. 将所有便利函数放在多个头文件内但隶属于同一个namespace，意味着可以轻松扩展这一组便利函数。比如STL做法就是这样。

# Item 24：若所有参数皆需类型转换，请为此采用non-member函数
假如有一个表示有理数的类，并且其对operator*进行了重载，如下：
```
class Rational{
public:
	Rational(int numerator = 0, int denominator = 1); //构造函数可以不为explicit，以允许int to Rational隐式转换。
	int numerator() const;
	int denominator() const;
	const Rational operator* (const Rational& rhs) const;
private:
	...
};
```
这样设计对两个Rational对象是没问题的。

但是如果要支持混合运算，即将ints和Rationals相乘

result = objOFRational * 2; //work

result = 2 * objOFRational; //wrong!

错误的原因是因为2没有对应的类，也没有对应的operator*，此时编译器查找non-member operator*，也没有一个接受int和Rational作为参数的non-member operator*，因此失败。

前面那一行正确的原因是因为发生了隐式转换。

因此只要设计一个non-member，non-friend(non-friend的原因是因为这个函数只需要public接口)的operator*即可。
```
const Rational operator*(const Rational& lhs, const Rational& rhs){
	return Rational(lhs.numerator()*rhs.numerator(), lhs.denominator() * rhs.denominator());
}
```
1. 一个重要的观察：member函数的反面是non-member函数，而非friend函数。
2. 无论何时如果可以避免friend函数就应该避免，就像在真实世界中，朋友带来的麻烦多于价值(hah)。

# Item 25：考虑写出一个不抛异常的swap函数
假设你有一个“pimpl(pointer to implementation)手法”写的对象，如下所示：
```
class Widget{
public:
	Widget(const Widget& rhs);
	Widget& operator=(const Widget& rhs){
		...
		*pImpl = *(rhs.pImpl);
		...
	}
	...
private:
	WidgetImpl* pImpl; //指针，所指对象内含Widget数据。
};
```
对于该类，要交换两个Widget对象的值，做法是交换pImpl指针，但是std::swap的做法是平淡的(即利用tmp来进行置换)，因此一种做法是针对Widget将std::swap特化。

步骤：

1. 提供一个public swap成员函数，让其高效的置换类型的两个对象值，并且这个函数`绝不该抛出异常`
2. 在class或template所在的命名空间内提供一个non-member swap，并令它调用上述swap成员函数。
3. 如果正编写一个class（而非class template），为class特化std::swap，并令它调用swap成员函数。
4. 最后，如果你调用swap，请确定包含一个using声明符，以便让std::swap在你的函数内曝光可见，然后不加任何namespace修饰符，赤裸裸地调用swap。

注：C++只允许对class模板偏特化，函数模板不能。
