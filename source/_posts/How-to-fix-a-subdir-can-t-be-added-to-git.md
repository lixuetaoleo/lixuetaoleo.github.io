---
title: How to fix a subdir can't be added to git
categories:
  - Software Development
date: 2019-10-18 17:03:28
tags: git
---
个人博客的git仓库一直有一个问题，就是git status显示themes/Chic文件夹是untracked，但是git add却无法将它add

今天终于解决该问题。。。

1. 首先发现在Chic文件夹下也有一个.git文件夹，遂删除之，然后还是无法add。
2. Google上找到一个答案，经证实有效：
   
   输入以下命令
   ```
   git rm -r --cached themes/Chic
   ```
   之后会发现Chic文件夹下的文件全都被追踪到了
3. git add themes/Chic  -->  git commit -m "..."  --> git push
   
   Done.!