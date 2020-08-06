---
title: 利用CSS实现各种形状(及实现原理)
titleImage:
categories:
  - Software Development
date: 2020-02-21 12:45:33
tags:
  - CSS
  - 前端
---
首先奉上CSS-trick上的利用CSS画各种形状：[The Shapes of CSS](https://css-tricks.com/the-shapes-of-css/)

在利用CSS画三角形时，我出现了一个疑虑：凭什么width和height都设置了0，四边border都设置了px，最后border是三角形？

后来经过研究，发现了其原理：

首先假设width和height都不为0：

```css
#demo{
  width:100px;  
  height:100px;  
  border: 20px solid;  
  border-color: red blue red blue; 
}
```

![6238168-e20f899ad54bc05a.png](https://i.loli.net/2020/02/23/WnICKSfRarqvDm8.png)

从图中看到每个border都是一个梯形，这并不像我之前以为的矩形。

接下来把div元素的宽变为0,这种情况下border又会是怎么变化的呢？

```css
#demo{
  width:0px;  
  height:0px;  
  border: 40px solid;  
  border-color: red blue red blue; 
}
```

![6238168-e270e4d37c79e4a7.png](https://i.loli.net/2020/02/23/WpMj1K9gcsAVfu7.png)

在这种情况下，4个梯形变成了4个个三角形。那么到这里也就知道了如何使用CSS画三角形了。

想要哪个方向的三角形，将该边的border设为非0px，其余几条边的border设置为:`border-xxx: solid xxpx transparent`
