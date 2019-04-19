# mongodb学习

## 连接和断开数据库

  ```
mongod开启数据库
# 该命令默认链接本机的MongoDB服务
mongo
#在连接状态数入exit
exit
  ```

## 基本命令

- `show dbs`
  - 查看当前数据库列表
- `use数据库名称`
  - 切换到指定的数据(没有会新建)
- `db`
  - 查看当前操作的数据库
- 插入数据
  - `db.student.insertOne({"name":"gong"})`
  - 这里db表示当前数据库

- 查询当前数据库的内容
  - `show collections`
  - `db.student.find()查具体内容`

## 在node中如何操作数据库

## 增加数据

```js
var admin = new User({
    username:'gong',
    password:'123',
    email:'admin@dmin'
})
admin.save(function(err,ret){
    if(err){
        console.log('msg:'+err)
    }
    console.log('保存成功')
    console.log(ret)
})

```

## 查询

```js

//查询数据
//********* 
// User.find(function(err,ret){
//     if(err){
//         console.log('err')
//     }
//     console.log(ret)
// })
//按条件查询所有
User.find({
    username:'guofeng'
},function(err,ret){
    if(err){
        console.log('err')
    }
    console.log(ret)
})
//按条件查询单个
User.findOne({
    username:'guofeng'
},function(err,ret){
    if(err){
        console.log('err')
    }
    console.log(ret)
})
```

## 更新数据

```js
//更新数据
// User.findByIdAndUpdate('5c6d1879c936053bd0339748',{
//     password:'123456'
// },function(err,ret){
//     if(err){
//         console.log('err')
//     }
//     console.log('修改成功')
// })
```

## 删除数据

```js
// User.remove({
//     username:'guofeng'
// },function(err,ret){
//     if(err){
//         console.log('err')
//     }
//     console.log('删除成功')
// })

```



### 用官方的`MongoDB`包来操作

# node操作mysql

## path模块操作文件路径

- **获取给定路径的文件名**

`path.basename('c:/a/b/index.js') ` =>`index.js`

`path.basename('c:/a/b/index.js','.j')` => `index`

- **获取路径名**

  `path.dirname('c:/a/b/index.js')` => `c:/a/b`

- **获取路径中文件的扩展名**

  `path.extname('c:/a/b/index.js')` => `.js`

- **判断路径是否是绝对路径**

  `path.isAbsolute('c:/a/b/index.js')` => `true`

- **将路径解析为对象**

  `path.parse('c:/a/b/index.js')` =>

   `{root:'c:/',`

  `dir:'c:/a/b',`

  `base:'index.js',`

  `ext:'.js',`

  `name:'index'}`

- `path.join('c:/a/','b','/c')` = > `c:\\a\\b\\c` 用来转换拼接路径

## Node中的其它成员

在每个模块中,除了`require`和`exports`等模块相关API之外,还有两个特殊成员:

- `__dirname` 可以用来获取当前文件模块所属目录的绝对路径,**动态获取**
- `__filename`可以用来获取当前文件的绝对路径

在文件操作中,使用相对路径是不可靠的,因为在node中,文件操作的路径被设计为相对于执行node命令所处的 路径.(这不是bug,)

所以为了解决这个问题,只需要把相对路径变为绝对路径就可以了

这里就可以使用`__dirname`和`__filename`

## 配置session

`npm i express-session`

- 引用

  `var session = require('express-session')`

- 配置

  ```js
  app.use(session({
      //配置加密字符串,它会在原有加密基础上和这个字符串拼接起来加密
      //目的是为了增加安全性,防止客户恶意伪造
      secret:'gong',
      resave:false,
      saveUninitialized:true //无论是否使用session,都会分配一把钥匙
  }))
  ```

- 使用

  ```js
  添加数据  req.session.foo ='bar'
   访问数据  req.session.foo 
  ```

`提示`默认session是内存存储的,服务器一旦重启就会丢失,真正的生产环境会把session中的数据持久化存储



### 安装

`npm i mysql`

``json-server --watch data.json `用来开启数据接口