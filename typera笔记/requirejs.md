# Define定义模块

```
define('helper',['jquery'],function($){
    return {
        trim:function(str){
            return $.trim(str)
        }
    }
})
这里helper是模块名
jquery是模块依赖
funciton是模块的实现
return $.trim(str)是返回的结果
一般情况下不写模块名,用自动构建工具加载
```

# require加载模块

```
require(['helper'],function(helper){
    var str = helper.trim(' amd ')
    console.log(str)
})
```

# 加载文件

**RequireJS以一个相对于baseUrl的地址来加载所有的代码**

# 加载机制

- **RequireJS**使用head.appendChild()将每一个依赖加载为一个script标签

- 加载即执行

# 配置模块路径

1. `baseUrl`
2. `paths``requirejs.config({baseUrl:'/js'},paths:{'jquery':'lib/jquery'})`

```
paths:{
    'jquery':[
        '//cdn.bootcss.com/jquery/2.2.3/jquery',
        'lib/jquery'
    ]//可以跟一个数组,第二个参数作为备用路径
}
```

# 定义模块

1. 函数式定义

```
define('helper',['jquery'],function($){
    return {
        trim:function(str){
            return $.trim(str)
        }
    }
})
//模块名helper可不写,模块依赖也可以不写,如果不需要依赖
```

2.定义简单的对象

```
define({
  username:'gong',
  name:'guofeng',
  gender:'male'
})
```

**实例**

```js
user.js文件
define({
  username:'gong',
  name:'guofeng',
  gender:'male'
})
```

```js
api.js文件
define(['jquery'],function($){
    return{
        getUser:function(){
            var def = $.Deffered();//jquery的异步加载方法
            require(['./app/user'],function(user){
                def.resolve(user)
            })
            return def
        }
    }
})
```

```js
app.js文件
requirejs.config({
    baseUrl:'/js',
    paths:{
        'jquery':'./lib/jquery'
    }
});
require(['jquery','./api/api'],function($,api){
    $('#user'),click(function(){
        api.getUser().then(function(user){
            console.log(user)
        })
    })
})
```

# 配置不支持AMD(即不支持require和define来写)的库和插件

- 库Modernizr.js
- 框架bootstrap

`shim`

```
shim:{
    'mondernizr':{//不支持AMD的模块 
        deps:['jquery'],//指定依赖的模块
        exports:'Mondernizr',//全局变量作为模块对象
        init:function($){//初始化函数,返回对象的代替exports作为模块对象
            return $;
        }
    }
}
```

```
shim:{
    'bootstrap':['jquery']//可以直接写以来的模块
}
```

# Map

```
map:{
    'app/api':{
        'jquery':'./lib/jquery'
    },
    'app/api2':{
        'jquery':'./lib/jquery2'
    }
}
```

**当app/api模块里加载jquery模块时,将加载jquery.js**

**当app/api2模块里加载jquery模块时,将加载jquery2.js**

==通过map可以加载不同的jquery版本==

# jsonp服务

`jsonp`是json的一种使用模式,可以跨域获取数据

```
$.ajax({
    url:'';
    dataType:'jsonp',
    jsonCallback:'callback'
})
```

**requirejs实现jsonp**

requirejs是通过script标签来加载模块

```
require(['http://www.biadu.com/user'],function(user){})
```

==user里的内容==

```
define({
  username:'gong',
  name:'guofeng',
  gender:'male'  
})
```

# 使用text插件加载HTML文件

插件`text.js`

用于加载文本文件的requirejs插件

通过ajax请求来加载文本

```
require(['text!/user.html'],function(template){
    $('#userinfo').html(template)
})
```

`text.js的配置`

```
requirejs.config({
    config:{
        text:{
            onXhr:function(xhr,url){},
            createXhr:function(){},
            onXhrComplete:function(xhr,url){}
        }
    }
})
```

# css插件

**用于加载样式文件的requirejs插件**

```
require([
    './app/api',
    'backbone',
    'jquery-ui',
    'css!css/jquery-ui/jquery-ui.css',
    'css!css/jquery-ui/jquery-ui.theme.css'
],function(api){})
```

为了让css!生效,在requirejs里配置

```
map:{
    '*':{
        'css':'./lib/require/css'
    }
}
```

# 插件i18n.js

i18n,支持国际化多语言,比如同时支持英语和中文

```
require([
    './app/api',
    'backbone',
    'i18n!./nls/messages',
    'jquery-ui'
],function(api,Backbone,i18n){})
```

```
配置语言
config:{
    i18n:{
        locale:'zh'
    }
}
```

# r.js打包

1. 打包工具r.js