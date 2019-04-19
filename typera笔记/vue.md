# Vue属性和方法

```
$data获取数据
$destroy销毁vue实例
```

## Vue.filter

```js
	<div id="app">
        <p>{{msg | msgFormat('疯狂','的人') | test}}</p>
    </div>
    <script>
        //定义一个Vue全局的过滤器,名字叫msgFormat
        //回调函数可以传多个参数,第一个参数是管道符前面的内容,后面的是想要替换的内容
        Vue.filter('msgFormat',function(mag,arg,arg2){
            return mag.replace(/单纯/g,arg+arg2)
        })
    // 过滤器可以多次调用
        Vue.filter('test',function(msg){
            return msg + "===="
        })
        var vm = new Vue({
            el:'#app',
            data:{
                msg:'曾经,我也是一个单纯的少年,单纯的我,傻傻的问,谁是世界上最单纯的人'
            },
            methods:{
            }
        }
```

## Vue里的生命周期函数

```js
 beforeCreate(){
                //这是我们遇到的第一个生命周期函数,表示实例完全被创建出来之前,会执行它
                //注意:在beforeCreate生命周期函数执行的时候,data和methods中的数据和方法都还没有初始化
                // console.log(this.msg);
                // this.show()
            },
            created(){//这是遇到的第二个,
                // console.log(this.msg);
                // this.show()
                //在这里data和methods都被初始化好了
                //如果要调用或操作data和methods,最早也要在created中

            },
            beforeMount(){//这是第三个,表示模板已经在内存中编辑完成,但尚未把模板渲染到页面中;
            
            },
            mounted(){//这是第四个,表示内存中的模板已经真实的挂载到页面中,用户已经可以看到
            //注意:mounted是事件创建期间的最后一个生命周期函数,当执行完mounted就表示,实例已经被完全创建好了,此时,如果没有其他操作的话,这个实例就静静躺在内存中了

            },

            //接下来的是运行中的两个事件
            beforeUpdate(){//这时候,界面还没有更新,但是数据被更新了,
            //当执行这个函数的时候页面中显示的函数还是旧的,此时data中的数据时最新的,页面尚未和最新的数据同步
            },
            updated(){//updated执行的时候,页面和数据已经保持同步了.

            },
            beforeDestroy(){
                //当执行到这的时候,Vue已经从运行阶段走到销毁阶段,
                //这时候,实例身上所有的data,methods以及过滤器,指令....都处于可用状态,此时还没真正执行销毁过程

            },
            destroyed(){
                //当执行到这的时候,组件以经被完全销毁,方法,指令,过滤器...都不可以用
            }
```

## 通过Vue-resource发送请求

```js
 getInfo(){
                    //发起get请求
                    this.$http.get('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2').then(function(result){
                        console.log(result)
                    })
                },
                postInfo(){
                    //发起post请求
                    //通过post的第三个参数,设置提交的 请求的类型是表单形式,第二个参数设置提交的内容
                    this.$http.post('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2',{},{emulateJSON:true}).then(function(result){
                        console.log(result)
                    })
                },
                jsonpInfo(){
                    this.$http.jsonp('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=2').then(result=>{
                        console.log(result)
                    })
                }
```

# vue实现动画

## 过渡类名实现动画

```js
		/* v-enter[这是一个时间点]是进入之前,元素的起始状态,此时还没		有进入 		*/
        /* .v-leave-to是动画离开之后,离开的终止状态,此时,元素动画已经			结束了 */
        .v-enter,
        .v-leave-to{
            opacity: 0;
            transform: translateX(180px)
        }
        /* 进入动画的时间段和离开动画的时间段 */
        .v-enter-active,
        .v-leave-active{
            transition: all 0.4s ease;
        }
```

**将需要执行动画的元素用transition标签包裹起来**

```js
 		<transition>
        <h3 v-if="flag">这是一个H3</h3>
        </transition>
```

### 修改v-前缀

```js
<transition name='my'>
    <h6 v-if="flag2">这是一个H6</h6>
</transition>
给transition添加name属性,用name属性的值替换默认的v
.my-enter,
.my-leave-to{
    opacity: 0;
    transform: translateY(180px)
}
/* 进入动画的时间段和离开动画的时间段 */
.my-enter-active,
.my-leave-active{
    transition: all 0.4s ease;
}
```

## 使用第三方animate.css实现动画

```js
<link rel="stylesheet" href="./lib/animate.css">
将第三方的动画效果作为class的值写入
<transition enter-active-class=' bounceIn' leave-active-class='bounceOut' :duration="{enter:200,leave:400}">
    <h3 v-if="flag" class="animated">这是一个H3</h3>
</transition>

<transition mode="out-in">
mode属性可已指定元素执行动画的先后顺序
```

## 列表元素的动画效果

```js
<!-- 在实现列表过渡的时候,给需要过渡的元素使用transitionGroup包裹 -->
        
<!-- <ul> -->
<!-- 如果要为v-for循环创建的元素设置动画,必须为每一个元素设置key属性 -->
<!-- 加一个appear可以实现页面刚展示出来入场时候的效果 -->
<!-- 通过为transition-group元素设置tag属性,指定将来渲染为什么元素,如果不指定,会默认为span -->
<transition-group appear tag="ul">
<li v-for="(item,i) in list" :key="item.id" @click="del(i)">
    {{item.id}}---{{item.name}}
</li>
</transition-group>

/* 下面的配合使用可以实现列表后续的元素渐渐的飘上来的效果 */
.v-move{
    transition: all 0.6s ease;
}
.v-leave-active{
    position: absolute;
}
```

# 创建组件

## 组件创建方式1

```js
//1.1 使用Vue.extend来创建全局的vue组件
var com1 = Vue.extend({
    template:'<h3>这是使用Vue.extend创建的组件</h3>'//通过template属性,指定了组件要创建的html结构
})
//1.2使用Vue.component('组件的名称',创建出来的组件模板对象)
// Vue.component('myCom1',com1)

// 如果使用Vue.component定义全局组件的时候,组件名称使用了驼峰命名,则在引用组件的时候,需要把大写 的驼峰改为小写的字母,同时两个字母之间使用 - 连接
// 如果不使用驼峰,则直接拿名称来使用即可
Vue.component('mycom1',com1)
```

## 组件创建方式2

```js
//注意:不论哪种方式创建出来的组件,组件的template属性指向的模板内容,必须有且只有一个根元素
Vue.component('mycom2',{
    template:'<div><h3>这是直接使用Vue.extend创建的组件</h3><span>123</span></div>'
    })

//    第一个参数:组件的名称,将来在引用组件的时候就是以标签形式来引入,
//第二个参数:Vue.extend创建的组件,其中template就是组件将来要展示的样式
// Vue.component('myCom1',Vue.extend({
//     template:'<h3>这是使用Vue.extend创建的组件</h3>'
// }))
```

## 组件创建方式3

```js
<!-- 在被控制的#App外面,使用template元素定义组件的HTML元素 -->
<template id="tmp1">
    <div>
        <h1>这是通过template元素在外部定义的组件结构,这个方式,有代码的只能提示高亮</h1>
        <h4>好用</h4>
    </div>
</template>

Vue.component('mycom3', {
    template: "#tmp1"
})
```

## 组件中的data和methods

```js
// 1.组件可以有自己的data数据,组件的data和实例的data有点不一样,实例中的data可以为一个对象,但是组件中的data是一个方法;
//组件中的data除了是一个方法外,内部还要返回一个对象

Vue.component('mycom1',{
    template:'<h1>这是全局组件---{{msg}}</h1>',
    data:function(){
        return {
            msg:'这是组件中的data定义的数据'
        }
    }
})
```

## 组件的切换方式1

```js
<div id="app">
    <a href="" @click.prevent="flag=true">登录</a>
    <a href="" @click.prevent="flag=false">注册</a>

    <login v-if="flag">

    </login>
    <register v-else="flag">

    </register>
</div>

Vue.component('login', {
    template: '<h3>登录组件</h3>'
})
Vue.component('register', {
    template: '<h3>注册组件</h3>'
})

var vm = new Vue({
    el: '#app',
    data:{
        flag:true//这里的Boolean的值用来控制页面初始加载时显示哪个组件
    }
})
```

## 组件切换方式2

```js
<div id="app">
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <!-- vue提供了component元素来展示对应名称的组件 -->
    <!-- component是一个占位符 :is属性是指定需要展示的组建的名称 -->
    <component :is="comName"></component>
</div>
 Vue.component('login', {
    template: '<h3>登录组件</h3>'
})

Vue.component('register', {
    template: '<h3>注册组件</h3>'
})


var vm = new Vue({
    el: '#app',
    data:{
        comName:'login'
    }
})
```

# Vue Router

## 起步

**HTML**部分

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

```

**js**部分

```js
// 1. 定义 (路由) 组件。
// 也可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

## 动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

一个“路径参数”使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，我们可以更新 `User` 的模板，输出当前用户的 ID：

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 `$route.params` 中。例如：

| 模式                          | 匹配路径            |             $route.params              |
| ----------------------------- | ------------------- | :------------------------------------: |
| /user/:username               | /user/evan          |         `{ username: 'evan' }`         |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

下面是一个例子:

```html
 <div id="app">
 	<p>
    <router-link to="/user/foo">/user/foo</router-link>
    <router-link to="/user/bar">/user/bar</router-link>
  </p>
  <router-view></router-view>
</div>
```

像上面这个例子:

可以通过点击切换路由实现共用`User组件的目的`的目的

## 嵌套路由

```js
父组件
<div id="app">
  <router-view></router-view>
</div>

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
上面的代码只是实现单个路由的组建的实现

从下面对代码可以看到,父组件中还包含一个router-view;这个是用来放子路由的组件内容
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

在路由配置中加入children参数就可以实现路由的嵌套效果
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
}
```

## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```html
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
router.push({ name: 'user', params: { userId: 123 }})
```

这两种方式都会把路由导航到 `/user/123` 路径。

# 自定义指令

```js
Vue.directive('focus',{
    inserted:function(el){
        el.focus()
    }
})
这里定义了一个全局的自动获取焦点的 组件
```

```js
directives:{
    focus:{
        inserted:function(el){
            el.focus()
        }
    }
}
这里注册了一个本地指令
```

`<input v-focus>可以获取焦点`

==这里的inserted是定义指令对象时提供的钩子函数==

指令定义对象可以提供多个钩子函数（全部是可选的）：

- `bind`：当指令首次绑定到元素时，只调用一次。这是您可以进行一次性设置工作的地方。
- `inserted`：当绑定元素已插入其父节点时调用（这仅保证父节点存在，不一定保证在文档中）。
- `update`：在包含组件的VNode更新后调用，**但可能在其子级更新之前**调用。指令的值可能已更改，也可能未更改，但您可以通过比较绑定的当前值和旧值来跳过不必要的更新（请参阅下面的钩子参数）。

- `componentUpdated`：在包含组件的VNode之后调用，**并**更新**其子节点**的VNode 。
- `unbind`：当指令从元素中解除绑定时，仅调用一次。

