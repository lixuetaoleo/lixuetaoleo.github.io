---
title: 从SSH应用中学到的东西
titleImage:
categories:
  - Software Development
date: 2019-12-09 16:56:49
tags:
  - Command Line
  - SSH
---
今天由于实验需要，要用到ssh远程连接功能，虽然之前也用过ssh配置github，但是远程连接功能却是第一次用到，遇到了不少坑，但也算对ssh应用入门了。

前提：如果机器没有公网IP，那么ssh client和server都需要在同一局域网下

## ssh安装和运行
1. ssh server
    
     * Linux: sudo apt install openssh-server
     * Windows: 设置--应用--可选功能--添加功能--点击"openssh服务器"安装；在任务管理器中选择"服务"标签页，点击底部的"打开服务"；在跳出来的新窗口中找到"OpenSSH SSH Server"，右键启动
     * [点击我](#jump)查看ssh服务是否开启成功

2. ssh client

目前Linux和Win10都自带这个命令，终端输入
```
ssh user_name@host

e.g: ssh csi@192.168.1.100 
```
之后出现一串提示字符，输入"yes"，敲回车，总之各种同意即可。


## 更方便的运用ssh(带UI的远程资源管理器)

* Linux : 资源管理器中，点击file -- connect to server，然后填写相应信息即可。
* Windows : [下载WinSCP](https://winscp.net/eng/index.php),进入软件后新建会话，填写相应信息即可。


## Tips
<span id="jump">1: Linux和Windows查看端口占用情况</span>

* Linux：sudo lsof -i:PORT
* Windows: netstat -an

2: 查找输出信息中特定的字符串(以端口占用情况为例，查找ssh服务监听的22号端口)
         
* Linux: sudo lsof -i:22 | grep ssh , 此时会把不含"ssh"输出行给过滤
* Windows：netstat -ano | findstr "22" , 效果与上面大致类似。



