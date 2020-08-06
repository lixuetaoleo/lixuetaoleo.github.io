---
title: Client-side Storage
titleImage:
categories:
  - Software Development
date: 2020-03-06 09:26:54
tags:
  - 前端
---
参考:[Client-side Storage by MDN](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage)

## 什么是客户端存储
1. 概述：在客户端存储数据 (比如在用户的机器上)，而且可以在需要的时候重新取得需要的数据。

2. 用处：
    1. 个性化网站偏好（比如显示一个用户选择的窗口小部件，颜色主题，或者字体）。
    2. 保存之前的站点行为 (比如从先前的session中获取购物车中的内容， 记住用户是否之前已经登陆过)。
    3. 本地化保存数据和静态资源可以使一个站点更快（至少让资源变少）的下载， 甚至可以在网络失去链接的时候变得暂时可用。
    4. 保存web已经生产的文档可以在离线状态下访问。 

## Cookie

### 概述
Cookie是服务器发送到浏览器并保存在本地的`一小块数据`，会在浏览器向服务器再次发起请求时携带，通常被用来告知服务器两个请求是否来自同一浏览器，比如保持用户登录状态。

### 用途

1. 会话状态管理(如用户登录状态，购物车，游戏分数等)
2. 个性化设置(如用户自定义设置，主题等)
3. 浏览器行为跟踪(如跟踪分析用户行为等)

### 缺点

浏览器每次请求都会携带Cookie，带来额外开销，`渐渐被淘汰`

### 使用方法

当服务器收到HTTP请求时，服务器在响应头里加一个set-cookie选项，浏览器收到后会保存下来，之后每次请求都通过cookie请求头部将cookie信息发送至服务器。

cookie的过期时间、域、路径、有效期、适用站点均可由需要来指定

基本格式: `set-cookie: <name>=<value>`

然后在浏览器->服务器时：

GET /xxx.html HTTP/1.1

Host: www.xxx.org

Cookie: \<name1\>=\<value1\>;\<name2\>=\<value2\>

### Cookie的分类

在Cookie添加一些属性，可以给Cookie带来不同效果

1. 会话期Cookie：浏览器关闭后自动删除
2. 持久性Cookie：可指定过期时间(时间取决于客户端).e.g:`set-cookie: xx=yy, Expires=a_date`
3. secure: 被标记了secure的cookie只能被HTTPS传至服务器，但是即使加了secure，敏感信息也不能用cookie传，因为cookie特有的不安全性
4. HTTPOnly：设置了这个属性，document.cookie这个API就无法访问，只能发送给服务器，`避免XSS攻击`

### 安全

1. 会话劫持 & XSS：web应用中，cookie常被用做标记用户or授权会话，所以如果web应用cookie被窃取，可能导致授权用户的会话遭受攻击，HTTPONLY的cookie能一定程度缓解这个问题
2. CSRF,跨站请求伪造：比如某站的一张图片，其实是一个银行提现的链接，当你点开这张含有URL的图片，如果之前你登录了银行账号而且cookie还生效(而且还没有其它验证步骤)，那么钱就没了。阻止此悲剧发生的手段：
    1. 对用户输入进行过滤来阻止XSS
    2. 任何敏感操作都要确认
    3. 用于敏感信息的cookie生命周期要短

## Web Storage--存储简单数据

### 概述
web storage提供一种非常简单的语法，用于存储和检索较小的，由`name`和`value`组成的数据项(并且只能是string和number)，当只存储一些简单数据(如用户名字，用户是否登录，屏幕背景颜色等)是非常有效的。

### 基本语法
web storage 数据都包含在浏览器内两个类似于对象的结构中： sessionStorage 和 localStorage。 第一种方法，只要浏览器开着，数据就会一直保存 (关闭浏览器时数据会丢失) ，而第二种会一直保存数据，甚至到浏览器关闭又开启后也是这样。

常用API:

1. Storage.setItem()(分为localStorage和sessionStorage,后同)方法允许在存储中保存一个数据项——它接受两个参数：数据项的名字及其值。
2. Storage.getItem() 方法接受一个参数——你想要检索的数据项的名称——并返回数据项的值。
3. Storage.removeItem() 方法接受一个参数——你想要删除的数据项的名称——并从 web storage 中删除该数据项。

### 特性

1. 数据一直存在。
2. 为每个域名分离存储。

## IndexedDB--存储复杂数据

### 概述

IndexedDB(又称IDB)可以在浏览器中访问的一个完整的数据库系统，可以存储复杂的关系数据。其种类不限于像字符串和数字这样的简单值，可以在一个IndexedDB中存储视频，图像和许多其他的内容。

### 用法

见参考文章的这一节，MDN给出了两个很好的例子，包括存储字符串和视频。

## Service Worker与离线文件存储

### 概述

使用IndexedDB已经是对用户体验的一个很大的改进，但每次访问网站时仍然需要下载主要的HTML，CSS和JavaScript文件，这意味着当没有网络连接时，它将无法工作。

这时可以利用service worker以及cache API。

### 基本用法

Service Workers 要求必须在 HTTPS 下才能运行

步骤遵循：register -> install -> fetch

详细教程可以参考[使用 Service Workers--MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)
