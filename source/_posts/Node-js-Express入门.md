---
title: Node.js/Express入门
categories:
  - Software Development
date: 2020-02-12 18:22:07
tags:
  - Node.js
  - 前端
---
## 安装
1. 安装node和npm：sudo apt install -y nodejs

    安装完成后在终端输入node -v 和 npm -v 如果有输出说明安装成功
    
2. 安装express

    sudo npm install express-generator -g
    -g代表全局安装，一般情况下工具都可以加-g进行全局安装

## 运行
1.  mkdir 项目名 新建一个项目并cd至这个新建的文件夹里
2.  express --view=pug  应用pug视图引擎生成一个项目骨架
3.  npm install 安装所需依赖
4.  DEBUG=express-locallibrary-tutorial:* npm start
    以DEBUG模式运行这个项目(在命令行会有信息输出)，如果直接npm start则不会有信息输出
5. 在浏览器键入`http://localhost:3000/`，可以看到默认的信息

6. 一个trick--项目在进行了文件改动之后自动刷新重启
    1. 利用nodemon，安装：sudo npm install -g nodemon
    2. 还可以把它作为开发依赖将安装在本地，于是使用这个项目的开发人员只要安装这个应用就能自动获得：
        1. npm install --save-dev nodemon
        2. 项目的 package.json 文件将自动添加一个新的属性：  "devDependencies": {"nodemon": "^1.18.9" }
        3. "scripts": {    "start": "node ./bin/www",    "devstart": "nodemon ./bin/www"  },
    3. 用新建的 devstart 命令启动服务器：DEBUG=express-locallibrary-tutorial:* npm run devstart



---
Express中间件的使用：

1. // 用 use() 为所有的路由和动词添加该函数
app.use(a_middleware_function);

2. // 用 use() 为一个特定的路由添加该函数
app.use('/someroute', a_middleware_function);

3. // 为一个特定的 HTTP 动词和路由添加该函数
app.get('/', a_middleware_function);

```JavaScript
const express = require('express');
const app = express();

// 示例中间件函数
const a_middleware_function = (req, res, next) => {
  // ... 进行一些操作
  next(); // 调用 next() ，Express 将调用处理链中下一个中间件函数。
};

// 用 use() 为所有的路由和动词添加该函数
app.use(a_middleware_function);

// 用 use() 为一个特定的路由添加该函数
app.use('/someroute', a_middleware_function);

// 为一个特定的 HTTP 动词和路由添加该函数
app.get('/', a_middleware_function);

app.listen(3000);
```


1. MongoDB 数据库里，“集合”中的“文档” 类似于 关系数据库里“表”中的“行”。
2. mongodb+srv://lixuetao:13579@cluster0-d9cdx.azure.mongodb.net/
local-library?retryWrites=true&w=majority

3. 控制器不是单个中间件函数（带参数（req, res, next）），而是指定一组中间件函数。数组传递给路由器函数，`并按顺序调用`每个方法。
4. trim()，以删除任何尾随/前导空格
5. escape()转义任何危险的 HTML 字符。
6. 所有的 POST控制器中，都使用了相同的模式：我们运行验证器，然后运行消毒器，然后检查错误，并使用错误信息重新呈现表单，或保存数据。
7. 可以用菊花链式连接验证器，使用withMessage()指定在前一个验证方法失败时，显示的错误消息。这使得在没有大量代码重复的情况下，提供特定的错误消息变得非常容易。
8. 可以使用optional()函数，仅在输入字段时运行后续验证（这允许我们验证可选字段）。例如，下面我们检查可选的出生日期是否符合 ISO8601 标准（checkFalsy 旗标，表示我们接受空字符串或null作为空值）
9. 参数从请求中作为字符串接收。我们可以使用toDate()（或toBoolean()等）将这些转换为正确的JavaScript类型。


---
---
---
## app.js

1. Express应用的入口是app.js。路由模块、数据库连接、模板引擎设置、各种app.use(...)都在这里配置
2. appjs都是通过app这个变量来操作
```js
const express = require('express');
const app = express();
app.use()...
app.set()...
```
```js
//连接mongodb
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://lixuetao:13579@cluster0-d9cdx.azure.mongodb.net/local-library?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

* * *
## mongoose用法/Model层
1. 在项目里创建models文件夹，所有的mongoDB的schema都放在这里。


```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const your_schema_name = new Schema({
    property_name:        
{
    type:String/Date/Number/Boolean...,
    required: true/false,
    min:...,
    max:...,
    default:...,
    enum:[],
},
//如果要引用别的schema
property_name:
{
    type: Schema.Types.ObjectId, 
    ref: 'Author', 
    required: true
}
});
```

1. 可以用virtual结合几个真实属性(比如属性分为了firstname和lastname，要添加一个fullname属性用virtual就可以)


```js
personSchema.virtual('fullName').
  get(function() {
    return this.name.first + ' ' + this.name.last;
  }).
  set(function(v) {
    this.name.first = v.substr(0, v.indexOf(' '));
    this.name.last = v.substr(v.indexOf(' ') + 1);
  });

axl.fullName = 'William Rose'; // Now `axl.name.first` is "William"
```

1. 最后导出这个schema


```js
module.exports = mongoose.model('Book/Author/...', your_schema_name);
```

1. 几个mongoose的API


```js
findByIdAndUpdate
findByIdAndRemove
```

* * *
## Controller层
1. controller层主要处理GET,POST等操作。首先要在routes文件夹下写路由的函数，然后传入回调各路由函数。e.g.:


```js
const express = require('express');
const router = express.Router();

const book_controller = require('../controllers/bookController');

router.get('/book/create', book_controller.book_create_get);
router.post('/book/create', book_controller.book_create_post);
//路由URL可以传递参数
比如：'/book/:id/delete'

module.exports = router;
```

1. controller文件夹里的函数就是各个回调函数。
    1. 查找某一个Schema的内容


    ```js
    exports.author_list = function (req, res, next) {
        Author.find()
            .sort([['family_name', 'ascending']])
         .exec(function (err, list_authors) {
              if (err) { return next(err); }
              //Successful, so render
    res.render('author_list', { title: 'Author List', author_list: list_authors });
        });
    };
    //find()不传参数找到所有的内容
    //sort给排序
    //exec执行回调，最后传参给模板引擎进行render,render函数的第一个参数是要render的文件名，第二个参数是给引擎传的内容。
    ```

  1. 查找多个schema的内容


    ```js
    exports.author_detail = function (req, res, next) {
      async.parallel({
        author: function (callback) {
          Author.findById(req.params.id)
            .exec(callback)
        },
        authors_books: function (callback) {          Book.find({ 'author': req.params.id }, 'title summary')
            .exec(callback)
        },
      }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
          var err = new Error('Author not found');
          err.status = 404;
          return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
      });
    };
    //req.params.id获取URL传过来的ID
    //async.parallel({prop:func1, prop:func2},回调)
    ```

  1. POST的回调可以用一个数组存多个函数，按顺序执行，首先清洗，然后sanitizeBody，validationResult，最后再对req、res和next进行处理

    ```js
    exports.author_create_post = [
      body('first_name').isLength({ min: 1 }).trim().withMessage('first name must be specified')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
      body('family_name').isLength({ min: 1 }).trim().withMessage('family name must be specified')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
      body('date_of_birth', 'invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
      body('date_of_death', 'invalid date of death').optional({ checkFalsy: true }).isISO8601(),
      sanitizeBody('first_name').trim().escape(),
      sanitizeBody('family_name').trim().escape(),
      sanitizeBody('date_of_birth').toDate(),
      sanitizeBody('date_of_death').toDate(),
      (req, res, next) => {
        const errs = validationResult(req);
        if (!errs.isEmpty()) {
          res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
          return;
        }
        else {
          const author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
          });
          author.save(function (err) {
            if (err)
              return next(err);
            res.redirect(author.url);
          });
        }
      }
    ];
    ```

* * *
## View层
express可以指定几个模板引擎：pug、ejs等，默认采用pug，也可以采用css预处理less、sass、stylus等，默认不采用预处理器。

这个项目用的pug，个人对pug较为熟悉，在此暂不记录



    