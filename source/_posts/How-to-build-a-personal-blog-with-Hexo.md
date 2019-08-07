---
title: How to build a personal blog with Hexo
categories:
  - Software Development
date: 2019-08-07 11:13:43
tags:
---
这篇文章将引导你如何利用Hexo搭建个人博客，并将其托管在GitHub。

详细搭建过程请[点击](https://blog.geekmubai.com/hexoblog/)，此处不再赘述。

下面将给出如何利用GitHub在不同电脑之间同步你的博客。

前提：已经将本地仓库与远程仓库关联。你已经懂得基本的git操作。

步骤：

1. 将scaffold，source，themes文件夹和_config.yml,package.json,package-lock.json,db.json等文件拷贝至一个你能找得到的路径（如桌面）
2. 在GitHub新建一个分支，分支名:hexo
3. 本地仓库执行命令:
        
		git pull -b hexo
	将新建的远程分支pull至本地。
4. checkout至hexo分支后，将目录下的所有内容清除，然后将第一步中的文件和文件夹移动至仓库根目录。
5. git三连，add，commit，push。
6. 经过上述步骤，你已经将你的文章和hexo渲染内容分离了，你的文章等内容在hexo分支，而hexo的渲染文件保存在master分支。
7. 每次hexo d部署完之后，记得进行git三连，将你的新博客推至git远程仓库。
8. 在新电脑如果要同步你的文章，只需安装hexo和hexo-deploy-git后，并将hexo分支拉取至本地即可。




常见问题:
- 写完博客并且执行hexo g,hexo s后，发现页面不正常
  
  检查themes文件夹下的主题文件夹是否为空。如果为空，将主题文件夹再复制进来。