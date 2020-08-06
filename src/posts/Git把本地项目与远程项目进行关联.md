---
title: Git把本地项目与远程项目进行关联
titleImage:
categories:
  - Software Development
date: 2020-01-10 15:06:23
tags:
  - Git
---
有时候会遇见这种情况

本地新建了一个Git项目但是在GitHub却没有建立一个仓库，所以导致本地的项目无法推送到GitHub上

所以在很长一段时间内，我都是现在GitHub新建一个仓库后clone下来再新建项目

后来针对这个问题进行了探索，方法呈现如下：

1.在本地项目添加origin，修改对应域名、用户名和项目名：

```bash
git remote add origin git@github.com:your_username/your_project.git
```

2.将远程项目先拉取并合并，允许不相关历史合并

```bash
git pull origin master --allow-unrelated-histories
```

3.合并后推送到远程，-u参数把本地的master分支和远程的master分支关联起来：

```bash
git push -u origin master
```

done
