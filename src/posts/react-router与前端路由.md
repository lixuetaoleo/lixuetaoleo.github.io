---
title: react-router与前端路由
titleImage:
categories:
  - Software Development
date: 2020-04-02 11:14:02
tags:
---
一直在用react-router，但之前只是简单地知道这些前端路由库都是借助HTML5里的history API实现，最近决定深入探索一下

---

## history API

HTML5 中的history API赋予了JavaScript访问浏览器历史记录的能力，可以在不刷新页面的前提下动态改变浏览器地址栏中的URL地址，动态修改页面上所显示资源，这对于单页应用非常有用。

### 历史记录栈(History Stack)

浏览器历史记录由一个URL栈组成，如果用户点击“后退”按钮，指针将指向当前URL的前一个元素，点击“前进”按钮，指针将指回这个URL，如果先点击“后退”再点击一个新的链接，那么栈顶元素将会被这个新的URL覆写。

### history API的安全限制

1. 只允许访问与该网站同源的历史记录，不允许访问其它的历史记录
2. 只允许将同源的历史记录入栈

### history对象

可以通过window.history访问history对象

history对象的几个方法：
  * back()
  * forward()
  * go(index)
  * pushState(stateObject, title, url)
  * replaceState(stateObject, title, url)

back方法相当于浏览器上的“后退”按钮。

forward方法相当于浏览器上的“前进”按钮，这个方法只有在调用过back方法或者点击过“后退”按钮时才有用。

go方法可以跳转指定索引的页数，即go(-1) === back(), go(1) === forward()

pushState(stateObject, title, url)中，url是入history栈的URL，title没什么用，stateObject是一个对象，可以包含任何数据，将新的URL推入历史记录堆栈时，该对象会与触发的事件一起传递

replaceState(stateObject, title, url)的用法和pushState差不多，它将history栈中的当前元素(不一定是栈顶元素)替换为新的URL

e.g.

```js
假设现history stack的状态如下所示：
-> google.com/search?kw=history
   google.com
   github.com
let state={};
let title='';
let url='www.apple.com';
window.history.pushState(state, title, url);
```
然后发现浏览器地址栏的URL变成了`google.com/search?kw=history/www.apple.com`
replaceState效果一样

但是浏览器不会加载这个URL，内容不变

### 历史记录变更事件(history change events)

history API的`onpopstate`事件使得网页能监听浏览器历史记录的变化，但由于安全限制，跨域的URL历史记录变化监听不了。

该事件只能由back、forward、go(包括点击浏览器的后退前进按钮)触发，pushState和replaceState不会触发这个事件

可以利用这个事件从URL中提取参数并将相应的内容加载到页面中(AJAX)

## react-router-dom实现原理

有了上述对history API的介绍，下面将简述react-router-dom是怎样借助这个API进行前端路由的。

react-router的思想其实很简单--将URL与UI渲染进行对应

### Link组件

react-router-dom常用的Link组件，本质上返回的是a标签。只是阻止了a标签默认的跳转href的行为。避免直接跳转页面。然后使用history的push(pushState)和replace(replaceState)方法进行跳转。path = to + query + hash

在得到了新的location对象后，系统内部的matchRoutes方法会匹配出Route组件树中与当前location对象匹配的一个子集，并且得到了 nextState，具体的匹配算法不介绍

Router组件的componentWillMount生命周期方法中调用了history.listen(listener)方法。listener会在上述matchRoute 方法执行成功后执行listener(nextState)，接下来执行this.setState(nextState)就可以实现重新渲染 Router组件。

流程图如下所示：

![image.png](https://i.loli.net/2020/04/05/LGm1WafV9PoUAEp.png)

---

## 参考文献

[HTML5 History API](http://tutorials.jenkov.com/html5/history-api.html)
[浅谈 react-router 实现原理](https://zhuzhengyuan.xyz/2019/01/03/understanding-react-router/)
