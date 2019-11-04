---
title: Useful Git Commands
categories:
  - Software Development
date: 2019-10-16 16:51:37
tags: 
  - Git
---
本教程是git的一些常用操作,不包括对git的介绍以及git的安装方式)，如果你对git一无所知，请先自行Google以对git有一定了解。

1. git clone --recursive < HTTPS or SSH address >  递归克隆(包括仓库中的子模块也一并clone)一个仓库
2. git config --global user.name < NAME >
   
   git config --global user.email < EMAIL >
   
   配置提交者的用户名和邮箱(通常只要安装git后第一次运行时配置)
3. git add < file name>  缓存 <文件> 中的更改，准备下次提交。
   
   git add < dir name>  缓存 <目录> 下的所有更改，准备下次提交。
  
   add完之后，利用git commit -m "useful commit message"将代码进行提交
4. git status : 显示文件状态
5. git log : 显示历史信息
   
   git log --author="John Smith" -p hello.py

   这个命令会显示 John Smith 作者对 hello.py 文件所做的所有更改的差异比较（diff）。以此类推，想看某人的提交就保留author。
6. git checkout < branch>  检出到banch分支

   git checkout -b < branch> 新建分支并切换到该分支

   git checkout --track origin/.../remotebranch 将远程的分支checkout至本地

   git push origin < space>:branchtodelete 删除远程分支

7. 回滚历史（git revert 与 git reset）
   回到某次提交：
   
   git revert < commit hash value>
   
   git reset --hard < commit hash value>

   撤销最近(第二近)提交

   git revert HEAD(HEAD^)

   撤销第N-1次提交：

   git revert HEAD~N

   git reset --hard HEAD~N

   其中commit hash value可以通过git log 获得  

   两者的区别:revert就是让别人知道你撤回过代码，reset --hard让别人不知道你撤回过代码，因此revert比较安全

   举个例子：假设已经有1，2，3，4，5次提交，如果你用revert，那么在git log上会有6次，1，2，3，4，5，6（代码回到第三次）；用reset，git log只有3次提交，因此如果你想回到4，5次提交，已经不可能了。所以建议用revert
8. git branch  查看本地所有分支
   
   git branch -a 查看所有分支(本地 + 远程)
   
   git branch < branch>  创建一个新分支(但不切换到该分支)
   
   git branch -d < branch>  删除指定分支。这是一个安全的操作，Git 会阻止你删除包含未合并更改的分支。 
   
   git branch -D < branch>  强制删除指定分支，即使包含未合并更改。如果你希望永远删除某条开发线的所有提交，你应该用这个命令。 谨慎使用！
   
   git branch -m < newname> 将当前分支命名为 < newname>
9. git merge < branch> -m "merge branch xxx"  将branch分支合并至当前分支
10. git stash  将当前代码托管然后并将当前工作还原至本次提交最原始代码
   
    git stash apply  恢复最近一次的stash(在同分支)
   
    git stash pop 恢复最近一次的stash(在不同分支)
  
    stash的几个指令在解决pull的问题时很有用，比如你在修改代码时发现你忘记pull最新代码，可以先git stash然后pull然后apply就能解决

***
上面是本地的git操作，如果想把这些内容同步至远端，则需要引进remote了。

1. git pull 拉取远程分支的内容. git pull = git fetch + git merge

2. git push origin localbranch:remotebranch 将本地分支的内容推至远程分支

***
## Git Workflow 

假设你已经clone仓库并且在项目做了修改，需要commit代码并且push

1. 提交之前请确认是否pull了最新代码！！！，如果没有pull，就先git stash然后git pull，然后git stash apply，如果提示有代码冲突，请打开vscode解决冲突。
2. git add ...(或者点击vscode里的"+")，添加要提交的文件
3. git commit -m "提交信息(你做的工作，修改的地方，简介即可)"
4. git push origin 本地分支名:远程分支名(一般与本地分支名相同)，如果不知道本地分支名是什么，用git branch查看(分支名前带*的就是当前分支)

假设已经commit，但是别人在你add，commit这段时间又推了最新代码，这是push会出错，提示你本地代码不是最新代码，按以下步骤解决：
1. git pull
2. add所有新出现的文件
3. git commit -m "fix conflict"
4. git push origin 本地分支名:远程分支名(一般与本地分支名相同)，如果不知道本地分支名是什么，用git branch查看(分支名前带*的就是当前分支)

merge步骤(假设你在A，你要merge到B)：
1. git checkout B
2. git pull
3. git merge A -m "merge branch A"
4. git push origin 本地分支名:远程分支名(一般与本地分支名相同)，如果不知道本地分支名是什么，用git branch查看(分支名前带*的就是当前分支)

假设在merge的第三步出现代码冲突错误，按以下步骤解决：
1. 在vscode中解决冲突（选择你要保留哪个版本的代码）
2. add所有的文件
3. git commit -m "merge branch A"
4. git push origin 本地分支名:远程分支名(一般与本地分支名相同)，如果不知道本地分支名是什么，用git branch查看(分支名前带*的就是当前分支)

checkout一个新分支并且该分支已经在远程仓库有：git checkout --track origin/..../......；如果远程没有：git checkout -b 新分支名

假设你在本地有两个分支(命名为A和B)，并且你在A上已经做了修改，但是却发现是要在B上提交，按以下步骤：
1. git stash
2. git checkout B
3. git pull
4. git stash pop
5. 后面继续进行代码修改与正常的提交步骤
   
***
### 各平台好用的可视化Git工具
Win/Mac：SourceTree，Fork

Linux：无应用程序，用VSCode插件代替：GitLens, GitHistory