# 高质量JavaScript的要点

## 减少全局变量

### JavaScript中的隐形全局对象

```js
function sum(x,y){
    result = x + y;
    return result;
}
这里result没有用var声明,因此会成为全局对象的一个属性
```

### 反模式

```js
function(){
    var a = b = 0;
}
这里的a是局部变量,b是全局变量
因为这里的计算是从右到左进行计算,因此可以等价为下面的代码
var a = (b = 0);
很明显,b没有被var声明,因此b会变成全局变量
```

### 忘记var时的副作用

隐式的全局变量和显示定义的全局变量之间有着细微的差别,差别在于通过delete来删除它们时的表现不一致。

- 通过var创建的全局变量，不能被删除
- 没有var创建的隐式全局变量，可以被删除

这里是因为没有通过var创建的全局变量，只能算全局对象的一个属性，因此属性是可以被delete删除的，而变量不可以被删除。

## 访问全局对象

### 单var模式

优点：

- 在同一个位置可以查找到函数所需的所有变量
- 避免在变量声明之前使用这个变量时产生的逻辑错误
- 提醒你不要忘记声明变量，顺便减少潜在的全局变量
- 代码量更少

```js
function fn(){
    var a = 1,
    	b = 2,
    	sum = a + b,
    	myObj = {},
    	i
}
```

### 声明提前:分散的var带来的问题

**在JavaScript中,一旦在某个作用域内声明了一个变量,这个变量在整个作用域内都是存在的,包括在var声明语句之前**

## for-in循环

for-in循环用于对非数组对象的遍历,因为for-in循环中属性的遍历顺序是不固定的

**可以使用hasOwnProperty()方法将从原型链中继承过来的属性过滤掉**

```js
var man{
    hands:2,
    legs:2,
    head:1
}
if(typeof Object.property.clone === 'undefined'){
    Object.property.clone = function(){}
}
在这里,给object的原型上添加了一个clone方法,原型链是实时的,因此所有对象都可以访问到这个新方法,所以,如果在美剧man的时候,想要避免枚举出clone(),需要调用hasOwnProperty来对原型属性进行过滤.
```

```js
for(var i in man){
    if(man.hasOwnProperty(i)){
        console.log(i,":",man[i])
    }
}
遍历的结果是:
hands:2
legs:2
head:1
//************
for(var i in man){
    console.log(i,":",man[i])
}
遍历的结果是:
hands:2
legs:2
head:1
clone:function()

另外一种写法是通过Object.property直接调用hasOwnProperty()方法:
for(var i in man){
    if(Object.property.hasOwnProperty.call(man,i)){
        console.log(i,":",man[i])
    }
}
这种方法的好处是,避免因man中定义了hasOwnProperty方法时产生的命名冲突
```

## switch模式

通过下面的写法,可以增强switch语句的可读性和健壮性

```js
var inspect_me = 0,
	result = '';
switch(inspect_me){
    case 0:
    	result = 'zero';
    	break;
    case 1:
    	result = 'one';
    	break;
    default:
    	result = 'unknow'
}
	
```

## 私有变量的命名

```
在变量名前加两个下划线,如:
__myFn;
在名字尾部加下划线以表明私有,name_

```

# 直接量和构造函数

## 自定义构造函数

```js
除了对象字面量和内置构造函数之外,也可以通过自定义的构造函数来创建实例对象
var Person = function (name) {
    this.name = name;
    this.say = function () {
        return "I am" + this.name
    }
}
var adam = new Person ('adam')
adam.say()//I am adam

```

在通过关键字new来调用这个构造函数时,函数体内发生了这些事情:

- 创建一个空对象,将它的引用赋值给this,继承函数的原型.
- 通过this,将属性和方法添加到这个对象
- 最后返回this指向的新对象(如果没有手动返回其它对象)

```js
用代码可以表示如下:
var Person = function (name) {
    var this = {};
    this.name = name;
    this.say = function () {
        return "I am" + name;
    }
    return this;
}
```

**正如这段代码所示,say()方法添加到this中,结果是,不论何时调用new Person(),在内存中都会创建一个新函数(所有Person的实例对象中的方法都是独占一块内存).显然这是效率很低的,因为所有实例的say()方法一模一样,因此没必要"拷贝"多份.最好的办法是将方法添加到Person的原型中**

```js
Person.property.say = function () {
    return "I am" + this.name
}
```

## 构造函数的返回值

用new调用的构造函数总会返回一个对象,默认返回this所指向的对象.如果构造函数内没有给this赋任何属性,则返回一个"空"对象(即除了继承构造函数的原型外,没有'自己的'属性)

尽管不会在构造函数内写return语句,也会隐式返回this.也可以返回自己指定的对象.如果返回的不是对象(字符串,数字或布尔值),程序不会报错,但这个返回值会被忽略,最终还是返回this所指的对象.

## 强制使用new模式

如果在创建构造函数实例时,忘记写new,运行时代码并不会报错,但是结果可能会偏离预期,因为此时函数内部的this会指向全局对象.

## 正则表达式直接量和构造函数之间的区别

正则表达式直接量只在解析时创建一次正则表达式对象(多次解析同一个正则表达式,会产生相同的实例对象).

**不带new和带new调用RegExp的效果是一样的**

# 函数

