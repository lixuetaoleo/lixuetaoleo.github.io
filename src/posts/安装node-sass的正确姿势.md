---
title: 安装node-sass的正确姿势
categories:
  - Software Development
date: 2020-01-16 22:13:33
tags:
titleImage:
---
因为node-sass被墙，因此安装的时候会报错，类似下面：

```bash
Downloading binary from https://github.com/sass/node-sass/releases/download/v4.13.0/win32-x64-64_binding.node
Cannot download "https://github.com/sass/node-sass/releases/download/v4.13.0/win32-x64-64_binding.node":

getaddrinfo ENOENT github-production-release-asset-2e65be.s3.amazonaws.com github-production-release-asset-2e65be.s3.amazonaws.com:443


Hint: If github.com is not accessible in your location
      try setting a proxy via HTTP_PROXY, e.g.


      export HTTP_PROXY=http://example.com:1234


or configure npm proxy via


      npm config set proxy http://example.com:8080


> node-sass@4.13.0 postinstall C:\Users\lixue\Tic-Tac-Toe\node_modules\node-sass
> node scripts/build.js
```

原因：安装 node-sass 时在 node scripts/install 阶段会从 github.com 上下载一个 .node 文件，大部分安装不成功的原因都源自这里，因为 GitHub Releases 里的文件都托管在 s3.amazonaws.com 上面，而这个网址在国内总是网络不稳定，所以我们需要通过第三方服务器下载这个文件。

解决方法：
一. 项目内添加一个 .npmrc 文件，内容如下填写
```
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
```

二.  假设你的梯子在你本地机器上开启了一个第三方服务器 127.0.0.1:1080，那么只需按照下面的方法配置一下就能正常安装 node-sass 了（如果你开启的是 PAC 模式而不是全局模式，那还需要将 s3.amazonaws.com 加入 PAC 列表）:
```
npm config set proxy http://127.0.0.1:1080
npm i node-sass
# 下载完成后删除 http 代理
npm config delete proxy
```

结果与副作用：这样使用 npm install 安装 `node-sass`、`electron` 和 `phantomjs` 时(这几个插件都被墙了)都能自动从淘宝源上下载，但是在`使用 npm publish 的时候要把 registry 这一行给注释掉，否则就会发布到淘宝源上去了。`
