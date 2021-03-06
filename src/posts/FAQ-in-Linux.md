---
title: FAQ in Linux
titleImage:
categories:
  - Software Development
date: 2019-11-09 21:14:58
tags:
  - Linux
---
这篇文章总结了我在折腾Linux系统时遇见的坑及其解决方法：

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
## 2. Linux搜狗输入法部分应用无法调用问题
在CLion和deepin-wine中无法调用sougou输入法，在输入法设置中，安装fcitx，重启，然后在fcitx设置中，禁用除keyboard-chinese 和搜狗以外的输入法，解决。

## 3. Linux下安装fcitx后中文字体为楷体的解决方案
现象：安装完fcitx之后，系统所有中文字都变楷体了，及其恶心。

解决方法：sudo apt install font-manager，在font manager中禁用所有楷体.

## 3. Linux deep-wine 微信字体问题
如果字体显示不正常(无图)，那么下载微软雅黑新版(6.21)字体

## 4. 配置系统启动顺序
/etc/default/grub

用管理员权限打开（否则无法保存）

GRUB_DEFAULT=0（默认选项,0开始）

GRUB_TIMEOUT=3（选择时间）

保存

终端输入sudo update-grub

重启生效

## 5. LINUX 下【Qt】错误GL/gl.h: No such file or directory的解决方法（以及cannot find -lGL解决方法）
参考：
https://blog.csdn.net/u010168781/article/details/80896797

## 6. Linux下安装wine以使用qq和微信等软件
https://github.com/wszqkzqk/deepin-wine-ubuntu

