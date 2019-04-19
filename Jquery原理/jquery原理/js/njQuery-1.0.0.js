(function (window, undefined) {
  var njQuery = function (selector) {
    return new njQuery.prototype.init(selector);
  }
  njQuery.prototype = {
    construct: njQuery,
    init: function (selector) {
      // 1.传入 '' null undefined等 返回空字符串
      // 2.字符串 :
      //   代码片段:会将创建好的dom对象存储到jq对象中返回
      //    选择器:将找到的所有元素存储到jq对象中返回
      // 3.数组:
      //  会将数组中存储的元素依次储存到jq对象中返回
      // 4.其他类型: 
      //    会将传入的数据存储到jq对象中返回

      // 0 去除字符串两端的空格
      selector = njQuery.trim(selector)
      // 1*********null等取反皆为true
      if (!selector) {
        return this;
      }
      // 2.判断是方法
      else if (njQuery.isFunction(selector)) {
        // console.log('是方法')
        njQuery.ready(selector)
      }
      // 2字符串
      else if (njQuery.isString(selector)) {
        // console.log('字符串')
        // 2.1判断是否是代码片段<a>
        if (njQuery.isHtml(selector)) {
          // console.log('代码片段')
          // 1.根据代码片段创建所有的元素
          var temp = document.createElement('div');
          temp.innerHTML = selector;
          /*
          // 2.将创建好的一级元素添加到jq
          for (var i = 0;i<temp.children.length;i++){
            this[i] = temp.children[i]
          }
          // 3.给jq对象添加length属性
          this.length = temp.children.length
          */
          [].push.apply(this, temp.children)
          // 4.返回加工好的this(即jQuery)
          return this;
        }
        // 2.2判断是否是选择器
        else {
          // 1.根据传入的选择器找到对应的元素
          var res = document.querySelectorAll(selector);
          // 2.将找到的元素添加到njQuery上
          [].push.apply(this, res)
          // 3.返回加工过的this
          return this;
        }

      }

      // 3.数组
      else if (njQuery.isArray(selector)) {
        // 3.1真数组
        /*
        if(({}).toString.apply(selector) === "[object Array]"){
          [].push.apply(this,selector)
          return this;
        }

        // 3.2伪数组
        else{
          console.log('伪数组')
          // 将自定义的伪数组转换为真数组
          var arr = [].slice.call(selector);
          // console.log(arr);
          // console.log("伪数组")
          // 将真数组转为伪数组
          [].push.apply(this,arr);
          return this;
        }
        */
        var arr = [].slice.call(selector);
        [].push.apply(this, arr)
        return this;

      }
      // 4.除了上述类型以外
      else {
        this[0] = selector;
        this.length = 1;
        return this;
      }
    },
    jquery: '1.1.0',
    selector: '',
    length: 0,
    //[].push找到数组的push方法
    // 冒号前面的push将来由njQuery调用
    // 相当于[].push.apply(this)
    // 下面两个类似
    push: [].push,
    sort: [].sort,
    splice: [].splice,
    toArray: function () {
      // console.log(this)
      return [].slice.call(this)
    },
    get: function (num) {
      // 没有传递参数
      if (arguments.length === 0) {
        return this.toArray()
      }
      //传递不是负数
      else if (num >= 0) {
        return this[num]
      }
      // 传递是负数
      else if (num < 0) {
        return this[num + this.length]
      }
    },
    eq: function (num) {
      // 没传参数
      if (arguments.length === 0) {
        return new njQuery();
      } else {
        return njQuery(this.get(num))
      }
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(this.length - 1)
    },
    each: function (fn) {
      return njQuery.each(this, fn)
    }
  }

  njQuery.extend = njQuery.prototype.extend = function (obj) {
    // console.log(this)
    for (key in obj) {
      this[key] = obj[key]
    }
  }

  // 工具方法
  njQuery.extend({
    isString: function (str) {
      return typeof str === 'string';
    },
    isHtml: function (str) {
      return str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3;
    },
    trim: function (str) {
      if (!njQuery.isString(str)) {
        return str
      }
      if (str.trim) { //判断浏览器支不支持trim方法
        return str.trim()
      } else {
        return str.replace(/^\s+|\s+$/g, '');
      }
    },
    isObject: function (selector) {
      return typeof selector === 'object'
    },
    isWindow: function (selector) {
      return selector === window;
    },
    isArray: function (selector) {
      if (njQuery.isObject(selector) && !njQuery.isWindow(selector) && "length" in selector) {
        return true;
      }
      return false
    },
    isFunction: function (selector) {
      return typeof selector === 'function'
    },
    ready: function (fn) {
      if (document.readyState == 'complete') {
        fn()
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
          fn()
        })
      } else {
        document.attachEvent('onreadystatechange', function () {
          if (document.readyState == 'complete') {
            fn()
          }
        })
      }
    },
    each: function (obj, fn) {
      // 1.判断是否是数组
      if (njQuery.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          // var res = fn(i,obj[i])
          var res = fn.call(obj[i], i, obj[i])
          if (res === true) {
            continue;
          } else if (res === false) {
            break;
          }
        }
      }
      // 2.判断是否是对象
      else if (njQuery.isObject(obj)) {
        for (key in obj) {
          // var res = fn(key,obj[key]);
          var res = fn.call(obj[key], key, obj[key])
          if (res === true) {
            continue;
          } else if (res === false) {
            break;
          }
        }
      }
      return obj;
    },
    map: function (obj, fn) {
      // 1.判断是否是数组
      var res = [];
      if (njQuery.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          var temp = fn(obj[i], i);
          if (temp) {
            res.push(temp)
          }
        }
      }
      // 2.判断是否是对象
      else if (njQuery.isObject(obj)) {
        for (key in obj) {
          var temp = fn(obj[key], key)
          if (temp) {
            res.push(temp)
          }
        }
      }
      return res;
    },
    getStyle: function (dom, styleName) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(dom)[styleName]
      } else {
        return dom.currentStyle(styleName)
      }
    },
    addEvent:function(dom,name,callback){
      if(dom.addEventListener){
        dom.addEventListener(name,callback)
      }else{
        dom.attachEvent("on"+name,callback)
      }
    }
  });

  // DOM操作
  njQuery.prototype.extend({
    empty: function () {
      //1.遍历所有找到的元素
      this.each(function (key, val) {
        val.innerHTML = ''
      })
      // 2.返回调用的对象,方便链式编程
      return this
    },
    remove: function (ele) {
      if (arguments.length === 0) {
        this.each(function (key, val) {
          // 根据遍历到的元素找到父元素,再根据父元素删除指定的元素
          var parent = val.parentNode;
          // 通过父元素删除指定元素
          parent.removeChild(val)
        })
      } else {
        var $this = this;
        //1. 根据传入的选择器,找到对应的元素
        $(ele).each(function (key, val) {
          // 2.遍历找到的元素,获取对应的类型
          var type = val.tagName;
          // 3. 遍历指定的元素
          $this.each(function (key, v) {
            //4. 获取指定元素的类型
            var t = v.tagName;
            // 5.判断找到元素的类型和指定元素的类型
            if (t === type) {
              // 根据遍历到的元素找到父元素,再根据父元素删除指定的元素
              var parent = val.parentNode;
              console.log(parent)
              // 通过父元素删除指定元素
              parent.removeChild(val)
            }
          })
        })
      }

      return this
    },
    html: function (content) {
      if (arguments.length === 0) {
        return this[0].innerHTML;
      } else {
        this.each(function (key, val) {
          val.innerHTML = content;
        })
      }
    },
    text: function (content) {
      if (arguments.length === 0) {
        var res = '';
        this.each(function (key, val) {
          res += val.innerText
        })
        return res;
      } else {
        this.each(function (key, val) {
          val.innerText = content;
        })
      }
    },
    appendTo: function (sele) {
      // 1.统一的将传入的数据转换为jQuery对象
      $target = $(sele)
      var $this = this;
      var res = []
      //1. 遍历取出所有指定的元素
      $.each($target, function (key, val) {
        // var targetEle = val;
        // 遍历取出所有source
        $this.each(function (k, v) {
          // 判断当前是否是第0个target
          // var sourceEle = v
          if (key === 0) {
            // 直接添加
            val.appendChild(v)
            res.push(v)
          } else {
            // 先拷贝再添加
            var temp = v.cloneNode(true);
            val.appendChild(temp)
            res.push(v)
          }
        });
      });
      // 2.返回所有添加的元素
      return $(res)
    },
    prependTo: function (sele) {
      // 1.统一的将传入的数据转换为jQuery对象
      $target = $(sele)
      var $this = this;
      var res = []
      //1. 遍历取出所有指定的元素
      $.each($target, function (key, val) {
        // var targetEle = val;
        // 遍历取出所有source
        $this.each(function (k, v) {
          // 判断当前是否是第0个target
          // var sourceEle = v
          if (key === 0) {
            // 直接添加
            val.insertBefore(v, val.firstChild)
            res.push(v)
          } else {
            // 先拷贝再添加
            var temp = v.cloneNode(true);
            val.insertBefore(temp, val.firstChild)
            res.push(v)
          }
        });
      });
      // 2.返回所有添加的元素
      return $(res)
    },
    append: function (sele) {
      // 判断传入的参数是否是字符串
      if (njQuery.isString(sele)) {
        this[0].innerHTML += sele;
      } else {
        $(sele).appendTo(this)
      }
      return this;
    },
    prepend: function (sele) {
      // 判断传入的参数是否是字符串
      if (njQuery.isString(sele)) {
        this[0].innerHTML = sele + this[0].innerHTML;
      } else {
        $(sele).prependTo(this)
      }
      return this;
    },
    insertBefore: function (sele) {
      // 1.统一的将传入的数据转换为jQuery对象
      $target = $(sele)
      var $this = this;
      var res = []
      //1. 遍历取出所有指定的元素
      $.each($target, function (key, val) {
        var parent = val.parentNode;
        // var targetEle = val;
        // 遍历取出所有source
        $this.each(function (k, v) {
          // 判断当前是否是第0个target
          // var sourceEle = v
          if (key === 0) {
            // 直接添加
            parent.insertBefore(v, val)
            res.push(v)
          } else {
            // 先拷贝再添加
            var temp = v.cloneNode(true);
            parent.insertBefore(temp, val)
            res.push(v)
          }
        });
      });
      // 2.返回所有添加的元素
      return $(res)
    },
  })

  // 属性操作相关方法
  njQuery.prototype.extend({
    attr: function (attr, val) {
      // 判断是否是字符串
      if (njQuery.isString(attr)) {
        //判断是一个字符串还是两个字符串
        if (arguments.length === 1) {
          return this[0].getAttribute(attr)
        } else {
          this.each(function (key, ele) {
            ele.setAttribute(attr, val)
          })
        }
      }
      // 判断是否是对象
      else if (njQuery.isObject(attr)) {
        var $this = this;
        // 遍历取出所有属性节点的名称和对应值
        $.each(attr, function (key, val) {
          // 遍历取出所有的元素
          $this.each(function (k, ele) {
            ele.setAttribute(key, val)
          })
        })
      }
      return this;
    },
    prop: function (attr, val) {
      // 判断是否是字符串
      if (njQuery.isString(attr)) {
        //判断是一个字符串还是两个字符串
        if (arguments.length === 1) {
          return this[0][attr]
        } else {
          this.each(function (key, ele) {
            ele[attr] = val;
          })
        }
      }
      // 判断是否是对象
      else if (njQuery.isObject(attr)) {
        var $this = this;
        // 遍历取出所有属性节点的名称和对应值
        $.each(attr, function (key, val) {
          // 遍历取出所有的元素
          $this.each(function (k, ele) {
            ele[key] = val;
          })
        })
      }
      return this;
    },
    css: function (attr, val) {
      // 判断是否是字符串
      if (njQuery.isString(attr)) {
        //判断是一个字符串还是两个字符串
        if (arguments.length === 1) {
          return njQuery.getStyle(this[0], attr)
        } else {
          this.each(function (key, ele) {
            ele.style[attr] = value;
          })
        }
      }
      // 判断是否是对象
      else if (njQuery.isObject(attr)) {
        var $this = this;
        // 遍历取出所有属性节点的名称和对应值
        $.each(attr, function (key, val) {
          // 遍历取出所有的元素
          $this.each(function (k, ele) {
            ele.style[key] = val;
          })
        })
      }
      return this;
    },
    val: function (content) {
      if (arguments.length === 0) {
        return this[0].value;
      } else {
        this.each(function (key, ele) {
          ele.value = content;
          console.log(ele.value)
        })
      }
      return this;
    },
    hasClass: function (name) {
      var flag = false;
      if (arguments.length === 0) {
        return false;
      } else {
        this.each(function (key, ele) {
          var className = " " + ele.className + " ";
          var name2 = " " + name + " ";
          if (className.indexOf(name2) != -1) {
            flag = true;
            return false; //相当于break;
          }
        })
      }
      return flag;
    },
    addClass: function (name) {
      if (arguments.length === 0) return this;
      // 对传入类名切割
      var names = name.split(' ')
      // 遍历取出所有元素
      this.each(function (key, ele) {
        // 遍历数组,取出每一个类名
        $.each(names, function (k, v) {
          // 判断指定元素中是否包含指定类名
          if (!$(ele).hasClass(v)) {
            ele.className = ele.className + " " + v;
          }
        })
      })
      return this;
    },
    removeClass: function (name) {
      if (arguments.length === 0) {
        this.each(function (key, ele) {
          ele.className = "";
        })
      } else {
        // 对传入类名切割
        var names = name.split(' ')
        // 遍历取出所有元素
        this.each(function (key, ele) {
          // 遍历数组,取出每一个类名
          $.each(names, function (k, v) {
            // 判断指定元素中是否包含指定类名
            if ($(ele).hasClass(v)) {
              ele.className = (" "+ele.className+" ").replace(" "+v+" ","");
            }
          })
        })
      }
      return this;
    },
    toggleClass:function(name){
      if(arguments.length === 0){
        this.removeClass()
      }
      else{
        // 对传入类名切割
        var names = name.split(' ')
        // 遍历取出所有元素
        this.each(function (key, ele) {
          // 遍历数组,取出每一个类名
          $.each(names, function (k, v) {
            // 判断指定元素中是否包含指定类名
            if ($(ele).hasClass(v)) {
              $(ele).removeClass(v)
            }else{
              $(ele).addClass(v)
            }
          })
        })
      }
      
      return this;
    },
  })

  // 事件操作相关方法
  njQuery.prototype.extend({
    on:function(name,callback){
      // 1遍历取出所有元素
      this.each(function(key,ele){
        //2 判断当前元素中是否保存所有事件的对象
        if(!ele.eventsCache){
          ele.eventsCache = {};
        }
        //3 判断对象中有没有对应类型的数组
        if(!ele.eventsCache[name]){
          ele.eventsCache[name] = [];
          // 4.将回调函数添加到数据中
          ele.eventsCache[name].push(callback)
          // 5.添加对应类型的事件
          njQuery.addEvent(ele,name,function(){
            njQuery.each(ele.eventsCache[name],function(k,method){
              method()
            })
          });
        }
        else{
          // 6.将回调函数添加到数组中
          ele.eventsCache[name].push(callback)
        }
        
      })  
      return this;
    },
    off:function(name,callback){
      // 1.判断是否传入参数
      if(arguments.length === 0){
        this.each(function(key,ele){
          ele.eventsCache = {};
        })
      }
      // 判断是否传入一个参数
      else if(arguments.length === 1){
        this.each(function(key,ele){
          ele.eventsCache[name] = [];
        })
      }
      //判断是否传入两个参数
      else if(arguments.length === 2){
        this.each(function(key,ele){
          njQuery.each(ele.eventsCache[name],function(index,method){
            if(method === callback){
              ele.eventsCache[name].splice(index,1)
            }
          })
        })
      }
    },
    clone:function(boolean){
      var res = [];
      // 判断是否是深复制
      if(boolean){
        // 深复制
        this.each(function(key,ele){
            var temp = ele.cloneNode(true);
          //遍历元素中的eventsCache对象
          njQuery.each(ele.eventsCache,function(name,array){
            // 遍历事件对应的数组
            njQuery.each(array,function(index,method){
              // 给复制的元素添加事件
              $(temp).on(name,method)
            })
          })
          res.push(temp)
        })
        return $(res)
      }else{
        this.each(function(key,ele){
          var temp = ele.cloneNode(true);
          res.push(temp)
        });
        return $(res)
      }
    }
  })

  /*
    njQuery.isString = function(str){
      return typeof str === 'string';
    }
    njQuery.isHtml = function(str){
      return str.charAt(0) === '<' && str.charAt(str.length-1)==='>' && str.length>=3;
    }
    njQuery.trim = function(str){
      if(!njQuery.isString(str)){
        return str
      }
      if(str.trim){//判断浏览器支不支持trim方法
        return str.trim()
      }else{
        return str.replace(/^\s+|\s+$/g,'');
      }
    }
    njQuery.isObject = function(selector){
      return typeof selector === 'object'
    }
    njQuery.isWindow = function(selector){
      return selector === window;
    }
    njQuery.isArray = function(selector){
      if(njQuery.isObject(selector) && !njQuery.isWindow(selector) && "length" in selector){
        return true;
      }
      return false
    }
    njQuery.isFunction = function(selector){
      return typeof selector === 'function'
    }
    */
  njQuery.prototype.init.prototype = njQuery.prototype;
  window.njQuery = window.$ = njQuery;
})(window)