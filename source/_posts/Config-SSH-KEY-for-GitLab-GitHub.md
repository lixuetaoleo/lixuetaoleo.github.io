---
title: Config SSH-KEY for GitLab/GitHub
categories:
  - Software Development
date: 2019-08-05 15:03:40
tags:
  - ssh
  - Git
---
### GitLab/Github配置添加SSH Key

1. 客户端配置生成SSH密钥对
        
		ssh-keygen -t rsa -C "YOUR EMAIL"
	完成后在 ~/.ssh/ (Windows是在user目录)会生成2个文件。id_rsa 和 id_rsa.pub。前者是私钥，注意保管，后者是公钥。

2. 添加SSH Key到GitLab/Github

	登录GitLab之后: Profile Settings => SSH Keys => Add SSH key

	输入之前生成的公钥，标题自定义。

	这样就行了。


