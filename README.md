# share-space-gatsby

share space built with Gatsby

基于Gatsby框架编写的个人博客系统，使用markdown编写文章，数据源经插件处理交由GraphQL在React中获取。

⚠️注意: 未做兼容性处理，建议使用较新版本的Chrome 或 Safari

## 使用方法🔧

### 运行步骤
1. git clone
2. npm install
3. npm run start
4. http://localhost:8000

### 可配置项
1. gatsby-config.js
   - title
   - description
   - author
   - socialMedia
     - Instagram
     - Twitter
     - Weibo
2. /static/CNAME 自定义域名
3. /src/posts/  markdown格式进行写作，可配置的字段如下
   1. title: 文章标题
   2. titleImage: 展示在blog页面的文章封面
   3. date: 日期(格式: YYYY-MM-DD)
4. /src/assets/background-image.jpg index页面的背景图

## Feature💡

1. 响应式, 适配移动端
2. 暗黑模式(跟随系统)
3. 令人愉悦的UI
4. 可配置选项

## TODO✅(优先级不分先后)
- [ ] PWA支持
- [ ] SEO
- [ ] 更加友好的无障碍体验
- [ ] 文章封面图在文章详情页的标题处显示
- [ ] 新建MarkDown文件时自动添加title, titleImage & date字段
- [ ] 可自定义的about页
- [ ] 更多的socialmedia选项
- [ ] 暗黑模式开关
- [ ] 加入更多文章列表页的卡片好看的背景色
- [ ] GraphQL多数据源
- [ ] 文章列表lazy load(如果有需要的话)
- [ ] 跳页动画
- [ ] 上/下一篇按钮
- [ ] 回到顶部按钮
- [ ] 更加优雅的UI&UE
- [ ] 微博, 微信, Twitter分享文章

## 版本说明📒

### 2020-08-08 v1.0.0

- 正式公开上线🎉
