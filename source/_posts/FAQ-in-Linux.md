---
title: FAQ in Linux
categories:
  - Software Development
  - Zen
  - Tech
date: 2019-11-09 21:14:58
tags:
  - Linux
---
这篇文章总结了Linux系统下各种常见坑及其解决方法：

开始吧

## 1. 解决Windows10时间快和Ubuntu时间差问题？
现象：Win10比Ubuntu慢8小时

原因：先说下两个概念：
- UTC即Universal Time Coordinated，协调世界时（世界统一时间）
- GMT 即Greenwich Mean Time，格林尼治平时

  Windows 与 Mac/Linux 看待系统硬件时间的方式是不一样的：
Windows把计算机硬件时间当作本地时间(local time)，所以在Windows系统中显示的时间跟BIOS中显示的时间是一样的。
Linux/Unix/Mac把计算机硬件时间当作 UTC， 所以在Linux/Unix/Mac系统启动后在该时间的基础上，加上电脑设置的时区数（ 比如我们在中国，它就加上“8” ），因此，Linux/Unix/Mac系统中显示的时间总是比Windows系统中显示的时间快8个小时。
所以，当你在Linux/Unix/Mac系统中，把系统现实的时间设置正确后，其实计算机硬件时间是在这个时间上减去8小时，所以当你切换成Windows系统后，会发现时间慢了8小时。就是这样个原因。

解决办法：

  在Ubuntu中把计算机硬件时间改成系统显示的时间，即禁用Ubuntu的UTC。
  
  这又有另一个需要注意的地方：
  在 Ubuntu 16.04 版本以前，关闭UTC的方法是编辑/etc/default/rcS，将UTC=yes改成UTC=no， 
  在Ubuntu 16.04使用systemd启动之后，时间改成了由timedatectl来管理，所以更改方法是
        
    timedatectl set-local-rtc 1 --adjust-system-clock
  执行后重启Ubuntu，应该就没有问题了。

参考来源：[知乎(作者：滑稽)](https://www.zhihu.com/question/46525639/answer/157272414)
## 2.
