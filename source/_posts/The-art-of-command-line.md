---
title: The art of command line
categories:
  - Software Development
date: 2019-11-09 21:02:54
tags:
  - Linux
  - Bash
---
1. '>' 和 '<' 来重定向输出和输入，学会使用 | 来重定向管道。明白 > 会覆盖了输出文件而 >> 是在文件末添加。了解标准输出 stdout 和标准错误 stderr 
2. ctrl-r 搜索命令行历史记录（按下按键之后，输入关键字便可以搜索，重复按下 ctrl-r 会向后查找匹配项，按下 Enter 键会执行当前匹配的命令，而按下右方向键会将匹配项放入当前行中，不会直接执行，以便做出修改）。 
3. 在bash中：
    -  ctrl-w ：删除键入的最后一个单词，
    - ctrl-u ：删除行内光标所在位置之前的内容
    - ctrl-k ：删除光标至行尾的所有内容
    - alt-b 和 alt-f ：以单词为单位移动光标
    - ctrl-a ：将光标移至行首
    - ctrl-e ：将光标移至行尾
    - ctrl-l ：清屏
    - man readline ：查看 Bash 中的默认快捷键 
4. 输命令到一半改变主意，可以利用alt-#然后回车来注释命令，这样既可以保留输入一半的命令，也可以使其不生效（或者利用ctrl-a然后输入#）
5. netstat -lntp 或 ss -plat ：检查哪些进程在监听端口（默认是检查 TCP 端口; 添加参数 -u 则检查 UDP 端口） 
6. lsof ：查看开启的套接字和文件。 
7. uptime 或 w ：查看系统已经运行多长时间。