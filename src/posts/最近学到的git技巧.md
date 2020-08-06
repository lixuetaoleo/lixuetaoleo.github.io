---
title: 最近学到的git技巧
titleImage:
categories:
  - Software Development
date: 2020-05-21 20:47:02
tags:
  - Git
---

## submodule相关

假如一个仓库有submodule，在clone的时候可以使用如下命令就能clone完整

```bash
git clone --recursive 仓库地址
```

但若clone的时候忘记加recursive参数，submodule是不会被clone下来的，此时可以用下面的命令单独对submodule进行clone

```bash
git submodule update --init --recursive
```

要update submodule，使用以下命令

```bash
git submodule update --recursive --remote
```

或者

```bash
git pull --recurse-submodules
```


## 为git配置代理

配置代理

```bash
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

取消代理

```
git config --global --unset http.proxy
git config --global --unset https.proxy
```
