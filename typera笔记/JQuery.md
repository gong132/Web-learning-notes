#  `jQuery`学习 

## 初识 `jQuery`

```js
// 原生js的固定写法
window.onload = function (ev) { }
// window.onload 当页面完全加载完的时候执行

// jquery的固定写法
$(document).ready(function () { })
// $(document).ready 当dom树搭建完毕时执行
```

### 区别

1. 原生的`JS` 如果编写了多个入口函数 , 后面编写的会覆盖前面编写的
2. `jQuery` 中编写多个入口函数, 后面的不会覆盖前面的

### `jQuery`  其他入口函数写法

1. ```js
   $(document).ready(function () { })
   ```

2. ```js
   jQuery(document).ready(function () { })
   ```

3. ```js
   $(function () { })
   ```

4. ```js
   jQuery(function () { })
   ```

### `jQuery` 冲突问题

1. 释放$的使用权

   ```js
   jQuery.noConflict();
   // 注意点: 释放操作必须在编写其他jQuery代码之前编写
   //		  释放之后就不能再使用$,改为使用jQuery
   ```

2. 自定义一个访问符号

   ```js
   var nj = jQuery.noConflict();
   nj(function () { });
   ```


## `jQuery` 核心函数和工具方法

### 核心函数

```js
$(); // 就代表调用jQuery的核心函数
```

1. 接收一个函数

   ```js
   $(function () { 
   	alert("hello boxsheep1")
   }) 							// 也就是入口函数
   ```

2. 接收一字符串

   1. 接受一个字符串选择器

      ```js
      var $box1 = $(".box1");
      var $box2 = $("#box2");
      // 返回一个jQuery对象.对象中保存了找到的DOM元素
      ```

   2. 接受一个代码片段

      ```js
      var $p = $("<p>我是段落</P>");
      $box1.append($p);	// 这是jq的方法;作用跟原生js中的appendchild()一样
      // 返回一个jQuery对象,对象中保存了创建的DOM元素
      ```

      

3. 接收一个DOM元素

   ```js
   var span = document.getElementsByTagName("span")[0];
   var $span = $(span)	// 会被包装成一个jQuery对象
   ```


### `jQuery` 对象

1. 什么是jQuery对象?

   - `jQuery`对象是一个伪数组

2. 什么是伪数组?

   - 有0 - length-1的属性, 并且有length属性

3. `jQuery` 对象可以通过调用get(0)方法获取到自身的`dom` 对象

   ```js
   $weibo.get(0)
   ```

### 静态方法实例方法

1. 静态方法

   ```js
   // 1.定义一个类
   function AClass() {}
   // 2.给这个类添加一个静态方法
   AClass.staticMethod = function () {}
   // 3.静态方法通过类名调用
   AClass.staticMethod();
   ```

2. 实例方法

   ```js
   // 2.给这个类添加一个实例方法
   AClass.prototype.instanceMethod = function () {}
   // 3.实例方法通过类的实例调用
   // 创建一个实例(创建一个对象)
   var a = new AClass();
   a.instanceMethod();
   ```


### 静态方法

1. `jQuery-each` 方法

   - 原生`js` 中,`Array.forEach()` 类似

     ```js
     var arr = [1,2,3,4];
     var obj = {0:1,1:2,2:3,3:4,length:4}
     // 第一个参数 : 遍历到的元素
     // 第二个参数 : 遍历到的当前索引
     // 注意点 : 原生中的forEach方法只能遍历数组,遍历不了伪数组
     arr.forEach(function (value, index) {
         console.log(index, value)
     })
     ```

   - `jQuery` 中

     ```js
     $.each(arr, function (index, value) {
         console.log(index, value)
     })
     // jQuery 中的each方法可以遍历伪数组
     $.each(obj, function (index, value) {
         console.log(index, value)
     })
     ```

2. `map` 方法

   - 原生`js` 中

     ```js
     var arr = [1,2,3,4];
     var obj = {0:1,1:2,2:3,3:4,length:4}
     arr.map(function (value, index, array) {
         console.log(index, value, array)
     })
     // 第一,二个参数同上
     // 第三个参数 : 当前被遍历的数组
     // 注意点 : 和原生forEach一样不能遍历伪数组
     ```

   - `jQuery` 中

     ```js
     var res = $.each(obj, function (index, value) {
         console.log(index, value)
     })
     var res2 = $.map(obj, function (index, value) {
         console.log(index, value)
     })
     var res3 = $.each(obj, function (index, value) {
         console.log(index, value);
         return index + value;
     })
     var res4 = $.map(obj, function (index, value) {
         console.log(index, value);
         return index + value;
     })
     console.log(res)	// {0:1,1:2,2:3,3:4,length:4}
     console.log(res2)	// []
     // jQuery 中each跟map方法的区别
     // each 的静态方法默认返回值是 : 遍历谁就返回谁
     // map 的静态方法默认返回值是一个空数组
     console.log(res3)	// {0:1,1:2,2:3,3:4,length:4}
     console.log(res4)	// [0:1,1:2,2:3,3:4]
     // each静态方法不支持在回调函数中对遍历的数组经行处理
     // map静态方法支持在回调函数中通过return对遍历的数组经行处理,然后生成一个新的数组返回
     
     ```

3. `$.trim();` 

   ```js
   var str = "      boxSheep       ";
   var res = $.trim(str);
   ```

4. `$.isWindow()` / `$.isArray()`  /`$.isFunction()` 

   ```js
   var w = window;
   var arr = [1,2,3];
   var obj = {0:1,1:2,2:3,length:3};
   var res = $.isWindow(w);   // true
   var res2 = $.isArray(obj); // false
   // 返回值是布尔类型
   // jQuery框架本身就是一个函数
   ```

5. `$.holdReady()` 

   ```js
   $.holdReady(true);
   $.(document).ready(function () {
       alert("ready");
   });
   $.holdReady(false);
   // 作用 : 暂停/恢复ready事件
   ```

## `jQuery` 属性操作

### `jQuery` 内容选择器

- $("div:empty");
  - 选中div中内容为空的div（即既没有文本也没有子元素的div）
- $("div:has(p)");
  - 选中div中包含p的div
- $("parent");
  - 选中有子元素或本文的div
- $("contains("test")");
  - 选中本文包含test的div

### `jQuery-attr`方法

1. 格式：$(元素选择器).`attr`(参数一，参数二)

2. 作用：获取或设置属性节点的值

   1. 可以传递一个参数，也可以传递两个参数

   2. 传递一个参数代表获取属性节点的值。（返回值是：获取到的属性节点的值）

   3. 传递两个参数代表设置属性节点的值。（返回值是：设置属性节点的元素组成`jQuery`对象）

3. 注意点
      1. 如果是获取属性节点的值：无论找到多少个元素，都只会返回第一个元素指定的属性节点的值返回。
      2. 如果是设置属性节点的值：找到多少个元素就设置多少个元素。
      3. 如果是设置属性节点的值：诺设置的属性节点不存在，系统会自动新增。

4. `removeAttr()`：删除属性节点（返回值是：删除属性节点的元素组成`jQuery`对象）

      1. 注意点：会删除所有找到的元素指定的属性节点。

      2. 删除多个属性节点时，引号里面用空格隔开。

         ```js
         $(function () {
             $("span").removeAttr("name,class");
         })
         ```

### `jQuery-prop`方法

1. 在操作属性接节点时，具有true和false两个属性的属性节点，如`cheked` ，selected或者disabled使用prop（），其他使用attr（）。

2. obj.prop("name", "value");

3. obj.removeProp("name");

   - prop 方法既能获取属性，又能获取属性节点

4. 如何选中jQuery对象中的第几个  `eq()`  

   ```js
   $(function () {
   	$("span").eq(0).prop("name","value");
   })
   ```

### `jQuery`操作类相关的方法

1. `addClass(class|fn)`

   ```js
   var button = document.getElementsByTagName("button");
   button[0].onclick = function () {
       $("div").addClass("class1") 	// 添加一个类
       $("div").addClass("class1 class2") 	// 添加多个类 用空格隔开
   }
   ```

   

2. `removeClass([class|fn])`

   ```js
   var button = document.getElementsByTagName("button");
   button[1].onclick = function () {
       $("div").removeClass("class1")    // 删除一个类
       $("div").removeClass("class1 class2")    // 删除多个类
   }
   ```

   

3. `toggleClass(class|fn[,sw])` 

   ```js
   var button = document.getElementsByTagName("button");
   button[2].onclick = function () {
       $("div").toggleClass("class1");  // 先看div的类名是不是class1, 如果不是 就把类名改成 class1, 如果是 , 就把类名删掉
       $("div").toggleClass("class1 class2");
   }
   ```

### `jQuery` 文本值相关的一些方法

1. `html([val | fn])`

   ```js
   var button = document.getElementsByTagName("button");
   button[0].onclick = function ()	{
       $("div").html("<p>我是段落<span>我是span</span></p>");	// 修改
       // 和原生JS中的innerHtml一模一样
       $("div").html(); // 查看
   }
   ```

2. `text([val | fn])` 

   ```js
   var button = document.getElementsByTagName("button");
   button[1].onclick = function () {
       $("div").text("<p>我是段落<span>我是span</span></p>");    // 修改
       // 和原生JS中的innerText一模一样
      	$("div").text();	// 查看
   }
   ```

3. `val([val | fn | arr])`

   ```js
   var input = document.getElementsByTagName("input");
   input[0].onclick = function () {
       $("div").val("请输入内容");	// 修改
       $("div").val();   // 查看
   }
   ```

### `jQuery` 修改`css` 样式

1. 逐个设置

  ```js
  $("p").css("color","red");  //将所有段落字体设为红色。
  ```

2. 链式设置（建议最多三个）

   ```js
   $("p").css("color","red").css("font-size","18px");  //将所有段落字体设为红色，字体大小为18px。
   ```

3. 批量设置（传入“对象”）

      ```js
      $("p").css({ 
          "color": "#ff0011", 
          "background": "blue" 
      });  //将所有段落的字体颜色设为红色并且背景为蓝色。
      ```

4. 传递函数，
         参数：1:属性名。2:此函数返回要设置的属性值。接受两个参数，index为元素在对象集合中的索引位置，value是原先的属性值。

     ```js
     $("div").click(function() {
     	$(this).css({
     		width: function(index, value) {
            	 	 return parseFloat(value) * 1.2;
     		}, 
              height: function(index, value) {
            		return parseFloat(value) * 1.2;
         	}
     	});
     });//逐渐增加div的大小,没点击一次div宽高扩大1.2倍
     ```

     

     2、读取css样式
     例子：$("p").css("color");   //取得第一个段落的color样式属性的值。  

### `jQuery`位置和尺寸操作的相关方法

1. 查看对象的宽度，不包括其边框

   ```js
   $("obj").width();
   ```

2. 查看绝对位置和相对位置

   $("obj").offset().left;

   ```js
   offset()指元素到窗口边框的距离；
   $("obj").offset().left;		 // 会算上margin,padding,bodder...等等	获取
   $("obj").offset({			// 设置元素距离窗口的偏移位
       left : 10 
   });
   ```

   $("obj").position().left;<sup>只能获取不能设置</sup> 

   ```js
   position()指元素到其父元素的距离；
   $("obj").position().left;   // 是指设置了absolute的子元素到其设置了relative	获取
   $("obj").css({				// 设置
       left : "100px"
   })
   ```

### `jQuery` 的`scrollTop` 方法

1. 文本框中

   ```js
   var btns = document.getElementsByTagName("button")
   btns[0].onclick = function () {
       console.log($(".scroll").scrollTop());	// 获取当前元素滚动条的距离	  查
   }
   btn[1].onclick = function () {
       $(".scroll").scrollTop(200);		// 使元素的滚动条滚到传入参数的距离  不能传入字符串   改
   }
   ```

2. 网页中

   ```js
   var btns = document.getElementsByTagName("button");
   btns[0].onclick = function () {
       console.log($("html").scrollTop());		// 在IE下不好使  需要用body
       console.log($("body").scrollTop());		// 在非IE下是 0;
       console.log($("body").scrollTop() + $("html").scrollTop());		// 这样就完美解决	查
   }
   btns[1].onclick = function () {
       $("html,body").scrollTop(200);
   }
   ```

## `jQuery` 事件相关

### `jQuery` 事件绑定

1. `eventName(fn)` 

   ```js
   $("button").click(function () {
       alert("hello dudu");	
   });
   $("button").click(function () {
       alert("hello xiuxiu");		// 不会覆盖第一个点击事件; 还可以给一个元素添加多个不同的事件; 也能添加
   })
   // 优点 : 编码效率略高
   // 缺点 : 部分由jquery未实现的事件不能用
   ```

2. `on(eventName,fn)` 

   ```js
   $("button").on("click", function () {
       alert("hello dudu520")
   })
   // 缺点 : 编码效率略低
   // 优点 : 所有的js的事件都能实现
   // 不会覆盖第一个点击事件; 还可以给一个元素添加多个不同的事件; 也能添加
   ```

3. `one(eventName,fn)` 

   ```js
   $("button").one("click", function () {
       alert("hello dudu520")
   })
   // 只能触发一次事件, 上面这个例子, 点第一次有用, 第二次就没用了
   ```

### `jQuery` 事件移除

1. off() 传一个参数 | 不传参

   ```js
   // 绑定事件
   $("button").click(function () {
       alert("hello dudu");	
   });
   $("button").mousemove(function () {
       alert("hello xiuxiu");
   })
   // 移除事件
   $("button").off(); // 会移除所有事件
   $("button").off("click"); // 会移除所有click事件
   ```

2. off() 传两个参数

   ```js
   // 绑定事件
   function test1 () {};
   function test2 () {};
   $("button").click(test1);
   $("button").click(test2);
   // 事件解绑
   $("button").off("click",test1);	// 会移除某个事件类型的某个方法
   ```

### `jQuery` 事件冒泡和默认行为

1. 什么是事件冒泡

   ```js
   $(".son").click(function () {
       console.log(123)
   })
   $(".father").click(function () {
       console.log(345)
   })
   // 由子元素触发了事件就会向父元素冒泡;并会响应
   ```

2. 如何阻止事件冒泡

   ```js
   $(".son").click(function () {
       console.log(123);
       return false;		// 第一种阻止方式
   })
   
   $(".son").click(function (event) {
   	console.log(123);
       event.stopPropagation();	// 第二种阻止冒泡事件的方式
   })
   ```

1. 什么是默认行为

   ```js
   // a标签默认事件, 就是会跳转页面
   // form表单,会提交数据
   ```

2. 如何阻止默认行为

   ```js
   $("a").click(function () {
       alert("aaa");
       return false;	// 第一种方法
   });
   $("a").click(function (event) {
       alert("aaa");
       event.preventDefault();	// 第二种方法
   });
   ```

### `jQuery` 事件自动触发

1. `$().trigger("eventName")` 

   ```js
   $(".father").click(function () {
       alert(234);
   })
   $(".father").trigger("click");	//  这个时候他就不需要点击 , 就能触发这个事件
   // 会触发默认事件
   // 会触发冒泡
   ```

2. `$().triggerHandler("eventName")` 

   ```js
   $(".father").click(function () {
       alert(234);
   })
   $(".father").triggerHandler("click");	//  这个时候他就不需要点击 , 就能触发这个事件
   // 不会触发默认事件
   // 不会触发冒泡
   ```

3. 面试题

   ```js
   // 给 a 标签添加一个点击事件, 并自动触发, 要求触发a标签的默认事件
   // 按理说 用trigger就行了 , 但是 a 标签有点特殊. trigger不能触发a标签的默认事件
   // 解决方案 : 给a标签添加一个span子标签 , 并给 span标签添加事件 . 这样就可以通过事件冒泡触发a标签的默认事件
   ```

### `jQuery` 自定义事件

1. 事件不能通过`eventName`,要通过`on ` 

2. 事件触发需要通过`trigger` 来触发

   ```js
   $(".son").on("myClick", function () {
       alert("son");
   });
   $(".son").triggerHandler("myClick")
   ```

### `jQuery` 事件命名空间

1. 事件绑定必须是on();

2. 在`eventName`后面加上` . +name`

3. 通过trigger触发事件 或者 `triggerHandler` 来触发

   ```js
   $(".son").on("click.zs", function () { alert("1234") } )
   $(".son").on("click.ls", function () { alert("1234") } )
   
   $(".son").trigger("click.ls");
   ```

4. 面试题

   ```js
   $(".father").on("click.ls", function () { alert("father click1" )} );
   $(".father").on("click", function () { alert("father click2" )} );
   $(".son").on("click.ls", function () { alert("father click3" )} );   // click3,1
   $(".son").on("click", function () { alert("father click4" )} );	// click1,2,3,4
   // 利用trigger触发子元素带命名空间的事件, 那么父元素带有相同命名空间的事件也会触发, 而父元素没有命名空间的事件不会触发
   // 触发子元素不带命名空间的事件, 那么父元素跟子元素 所有相同类型的事件都会被触发
   ```

### `jQuery` 事件委托

```js
$("ul").delegate("li", "click", function () {
    console.log(this)
})
// 用来监听你后来动态添加的元素添加事件
```

1. 练习(点击登陆)

   ```js
   // 我们最好不要给添加了事件的元素添加时间委托, 在这里我们可以使用body用来监听时间委托
   $("a").click(function () {
       var $mask = $("<div></div>")	// 入口函数里放字符串代码片段,他会自动生成并返回
       $("body").append($mask);
       $("body").delegate("span", "click", function () {
           $mask.remove();
       })
       return false;   // 阻止默认事件
   })
   ```


### `jQuery` 移入移出事件

1. 移入

   ```js
   $(".father").mouseover(function () {
       console.log("father 移入")
   })
   ```

2. 移出

   ```js
   $(".father").mouseout(function () {
       console.log("farher 移出")
   })
   ```

- `mouseover/mouseout`事件, 子元素被移入移出也让触发父元素的事件

- `mouseenter/mouseleave` <sup>  推荐使用这个</sup> 事件, 子元素移入移出不会触发父元素的事件

- 终极版!!
1. `hover`传入两个参数

  ```js
   $(".father").hover(function () {
       console.log("father 移入")
   }, function () {
       console.log("father 移出")
   })
  // 第一个参数 移入
  // 第二个参数 移出
  ```

2. 传入一个参数

   ```js
   $(".father").hover(function () {
       console.log(".father 移入又移出")
   })
   // 移入或移出
   ```

## `jQuery` 动效

### `jQuery` 显示隐藏

1. 显示

   ```js
   $("div").show(1000, function () {
       // 显示完毕后执行
   })
   ```

2. 隐藏

   ```js
   $("div").hide(1000, function () {
       // 隐藏完毕之后执行
   })
   ```

3. 切换

   ```js
   $("div").toggle(1000, function () {
       // 切换完毕之后执行
   })
   ```

### `jQuery` 展开和收起动画

1. 展开

   ```js
   $("div").slideDown(1000, function () {
       // 展开完毕后执行
   })
   ```

2. 收起

   ```js
   $("div").slideUp(1000, function () {
       // 收起完毕后执行
   })
   ```

3. 切换

   ```js
   $("div").slideToggle(1000, function () {
       // 切换完毕后执行
   })
   ```

### `jQuery` 停止动画

1. 停止动画,可以有效地避免动画自嗨的场景

   ```js
   $(".nav-li").mouseenter(function () {
       var $sub = $(this).children(".sub");
       $sub.stop();
       $sub.sliedDown(1000);
   });
   $(".nav>li").mouseleave(function () {
       var $sub = $(this).children(".sub");
       $sub.stop();
       $sub.sliedUp(1000);
   })
   ```

### `jQuery` 淡入淡出动画

1. 淡入

   ```js
   $("div").fadeIn(1000, function () {
       alert("淡入完毕")
   })
   ```

2. 淡出

   ```js
   $("div").fadeOut(1000, function () {
       alert("淡出完毕")
   })
   ```

3. 切换

   ```js
   $("div").fadeToggle(1000, function () {
       alert("切换完毕")
   })
   ```

4. 淡入到

   ```js
   $("div").fadeTo(1000, 0.2, function () {
       alert("淡入到完毕")
   })
   ```

### `jQuery` 自定义动画

1. 操作属性

   ```js
   $("button").eq(0).click(function () {
       $(".one").animate({
           width: 500
       },1000 , function () {
           alert("自定动画执行完毕")
       })
   })
   //	第一个参数 : 接受一个对象, 可以在对象中修改属性
   //  第二个参数 : 指定动画时长
   //	第三个参数 : 指定动画节奏, 默认是 swing
   //	第四个参数 : 动画执行完毕后的回调函数
   ```

2. 累加属性

   ```js
   $("button").eq(0).click(function () {
       $(".one").animate({
           width: "+=100"
       },1000 , function () {
           alert("自定动画执行完毕")
       })
   })
   // 可以点击多次, 宽度每点一次就会加100
   ```

3. 关键字

   ```js
   $("button").eq(0).click(function () {
       $(".one").animate({
           // width: "hide"
           width: "toggle"
       },1000 , function () {
           alert("自定动画执行完毕")
       })
   })
   ```

### `jQuery` 中stop和delay方法

1. delay()

   ```js
   // delay方法的作用就是用于告诉系统延迟时长
   $(".one").animate({
       width : 500
   }, 1000).delay(2000).animate({
       height : 500
   }, 1000);
   ```

2. stop()

   ```js
   // 立即停止当前的,立即执行后续的
   stop(); stop(false); stop(false,false)
   // 立即停止当前和后续所有动画
   stop(true); stop(true,false)
   // 立即完成当前的, 继续执行后续的
   stop(false, true);
   // 立即完成当前的, 并且暂停后续的
   top(true, true);
   ```

### `jQuery`动效设置

1. `jQuery.fx.off` 

   ```JS
   jQuery.fx.off = false;   // 默认是false , 全局动效是打开的, 要想关闭 就改成true;
   ```

2. `jQuery.fx.interval`

   ```js
   jQuery.fx.interval = 13;	// 控制动画帧数的默认是13; 这个值越大, 动画越卡, 这个值越小, 动画越流畅, 消耗性能越高
   ```

## `jQuery` 节点操作

### `jQuery` 添加节点相关的方法

- ### 内部插入

  - `append(content|fn)`

    ```js
    // 会将元素添加到指定元素内部的最后
    var $li = $("<li>新增的li</li>");
    $("ul").append($li);
    ```

  - `appendTo(content)`

    ```js
    // 会将元素添加到指定元素内部的最后
    var $li = $("<li>新增的li</li>");
    $li.appendTo("ul");
    ```

  - `prepend(content|fn)`

    ```js
    // 会将元素添加到指定元素内部的最前
    var $li = $("<li>新增的li</li>");
    $("ul").prepend($li);
    ```

  - `prependTo(content)`

    ```js
    // 会将元素添加到指定元素内部的最前
    var $li = $("<li>新增的li</li>");
    $li.prependTo("ul")
    ```

- ### 外部插入

  - `after(content|fn)`

    ```js
    // 会将元素添加到指定元素外部的后面
    var $li = $("<li>新增的li</li>");
    $("ul").after($li);
    ```

  - `before(content|fn)`

    ```js
    // 会将元素添加到指定元素外部的前面
    var $li = $("<li>新增的li</li>");
    $("ul").before($li);
    ```

  - `insertAfter(content)`

    ```js
    // 会将元素添加到指定元素外部的后面
    var $li = $("<li>新增的li</li>");
    $li.insertAfter("ul");
    ```

  - `insertBefore(content)`

    ```js
    // 会将元素添加到指定元素外部的前面
    var $li = $("<li>新增的li</li>");
    $li.insertBefore("ul");
    ```

### `jQuery` 删除节点的相关方法

1. `remove([expr])` 

   ```js
   $("div").remove(); // 删除指定元素
   ```

2. `empty()` 

   ```js
   $("div").empty(); // 删除指定元素的内容跟子元素  指定元素本身不会被删除
   ```

3. `detach()` 

   ```js
   $("div").detach(); // 删除指定元素	跟remove 一模一样 只是名字不一样
   ```

### `jQuery` 替换节点相关的方法

1. `replaceWith(content | fn)`

   ```js
   // 1. 新建一个元素
   var $h6 = $("<h6>我是标题<h6>")
   $("h1").replaceWith($h6);
   // 替换所有匹配的元素为指定元素
   ```

2. `replaceAll(selector)`  

   ```js
   // 1. 新建一个元素
   var $h6 = $("<h6>我是标题<h6>")
   $h6.replaceAll("h1")
   // 替换所有匹配的元素为指定元素
   ```

### `jQuery` 复制节点相关的方法 `clone()`

1. 浅复制

   ```js
   var $li = $("li:first").clone(false);	// 传参false 就是浅复制
   $("ul").append($li);
   // 浅复制并不会复制事件
   ```

2. 深复制

   ```js
   var $li = $("li:first").clone(true);	// 传参true 就是深复制
   $("ul").append($li);
   // 深复制会复制事件
   ```