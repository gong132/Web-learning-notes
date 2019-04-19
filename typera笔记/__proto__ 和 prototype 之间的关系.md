# `__proto__` 和 `prototype` 之间的关系

## 一、所有构造器/函数的`__proto__` 都指向 `Function.prototype` 他只是个空函数

```js
Number.__proto__ === Function.prototype  // true
Boolean.__proto__ === Function.prototype // true
String.__proto__ === Function.prototype  // true
Object.__proto__ === Function.prototype  // true
Function.__proto__ === Function.prototype // true
Array.__proto__ === Function.prototype   // true
RegExp.__proto__ === Function.prototype  // true
Error.__proto__ === Function.prototype   // true
Date.__proto__ === Function.prototype    // true
```

- JavaScript中有内置(build-in)构造器/对象共计12个（[ES5](http://kangax.github.com/es5-compat-table/)中新加了`JSON`），这里列举了可访问的8个构造器。剩下如Global不能直接访问，Arguments仅在函数调用时由`JS`引擎创建，

- Math，JSON是以对象形式存在的，无需new。它们的`__proto__`是Object.prototype。

  ```js
  Math.__proto__ === Object.prototype  // true
  JSON.__proto__ === Object.prototype  // true
  ```

- 上面说的“所有构造器/函数”当然包括自定义的。如下

  ```js
  // 函数声明
  function Person() {}
  // 函数表达式
  var Man = function() {}
  console.log(Person.__proto__ === Function.prototype) // true
  console.log(Man.__proto__ === Function.prototype)    // true
  ```

- 这说明什么呢？
  - 所有的构造器都来自于Function.prototype，甚至包括根构造器Object及Function自身。
  - 所有构造器都继承了Function.prototype的属性及方法。如length、call、apply、bind（`ES5`）。

- Function.prototype也是唯一一个 `typeof XXX.prototype` 为 “function”的prototype。其它的构造器的prototype都是一个对象。

  ```js
  console.log(typeof Function.prototype) // function
  console.log(typeof Object.prototype)   // object
  console.log(typeof Number.prototype)   // object
  console.log(typeof Boolean.prototype)  // object
  console.log(typeof String.prototype)   // object
  console.log(typeof Array.prototype)    // object
  console.log(typeof RegExp.prototype)   // object
  console.log(typeof Error.prototype)    // object
  console.log(typeof Date.prototype)     // object
  console.log(typeof Object.prototype)   // object
  ```

- 知道了所有构造器（含内置及自定义）的`__proto__`都是`Function.prototype`，那`Function.prototype`的`__proto__`是谁呢？

  ```js
  console.log(Function.prototype.__proto__ === Object.prototype) // true
  ```

- 这说明所有的构造器也都是一个普通`JS`对象，可以给构造器添加/删除属性等。同时它也继承了`Object.prototype`上的所有方法：`toString`、`valueOf`、`hasOwnProperty`等

- 最后Object.prototype的`__proto__` 是谁？

  ```js
  Object.prototype.__proto__ === null   // true
  ```

## 二、所有对象的`__proto__` 都指向其构造器的prototype

- 上面测试了所有内置构造器及自定义构造器的`__proto__`，下面再看看所有这些构造器的实例对象的`__proto__` 指向谁？

1. 先看看JavaScript引擎内置构造器

   ```js
   var obj = {name: 'jack'}
   var arr = [1,2,3]
   var reg = /hello/g
   var date = new Date
   var err = new Error('exception')
    
   console.log(obj.__proto__ === Object.prototype) // true
   console.log(arr.__proto__ === Array.prototype)  // true
   console.log(reg.__proto__ === RegExp.prototype) // true
   console.log(date.__proto__ === Date.prototype)  // true
   console.log(err.__proto__ === Error.prototype)  // true
   ```

2. 再看看自定义的构造器，这里定义了一个Person

   ```js
   function Person(name) {
       this.name = name
   }
   var p = new Person('jack')
   console.log(p.__proto__ === Person.prototype) // true
   ```

3. 每个对象都有一个constructor属性，可以获取它的构造器，因此以下打印结果也是恒等的

   ```js
   console.log(p.__proto__ === Person.prototype) // true
   console.log(p.__proto__ === p.constructor.prototype) // true
   ```

4. 上面的Person没有给其原型添加属性或方法，这里给其原型添加一个`getName` 方法

   ```js
   function Person(name) {
       this.name = name;
   }
   // 修改原型
   Person.prototype.getName = function () {}
   var p = new Person("jack")
   console.log(p.__proto__ === Person.prototype) // true
   console.log(p.__proto__ === p.constructor.prototype) // true
   ```

   - 可以看到`p.__proto__` 与Person.prototype，p.constructor.prototype都是恒等的，即都指向同一个对象。

   

   - 如果换一种方式设置原型，结果就有些不同了

     ```js
     function Person (name) {
         this.name = name
     }
     // 重写原型
     Person.prototype = {
         getName : function () {}
     }
     var p = new Person("jack")
     console.log(p.__proto__ === Person.prototype) // true
     console.log(p.__proto__ === p.constructor.prototype) // false
     ```

     - 理解 : 这里手动修改了`Person.prototype`的指向空间, 并且指向了一个对象字面量
     - 原来的`Person.prototype` 是由 `new` 关键字创建的 (`Object.create(Person.prototype)`)  `Person.prototype` 里面的`constructor` 属性指向的是 Person
     - 但是自从改了他的指向之后.他的新指向指的是一个对象字面量, 而这个对象字面量是通过new Object()创建的,所以新指向的空间的constructor的值是Object,而不是Person;

5. 上面代码中用到的`__proto__` 目前在`IE6/7/8/9` 中都不支持. `IE9 ` 中可以使用 `Object.getPrototypeOf(ES5)` 获取对象的内部原型.

   ```js
   var p = {}
   var __proto__ = Object.getPrototypeOf(p)
   console.log(__proto__ === Object.prototype) // true
   ```