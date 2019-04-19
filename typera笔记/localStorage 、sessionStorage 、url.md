# localStorage 、sessionStorage 、url

### localStorage

* localStorage 存对象

1：先将带存储对象，转化为json 字符串 stringify ()

2：将转化后的 JSON 字符串存到 localStorage 中

3：从localStorage 获取到该数据，在转化为 JSON 对象，parse()

```javascript
var text = {
    'name':'zhou'，
    'code':'2222'
}
// 转化为json字符串
var obj = JSON.stringify(text)
//存储JSON字符串
localStorage.setItem('obj',obj)
//获取存的数据
var newObj = localStorage.getItem('obj')
//转化为 JSON 对象
newObj = JSON.parse(newObj)
console.log(newObj)
```

* localStorage 增删改查

```javascript
var str = '154'
// 清空所有数据
localStorage.clear()
//添加或者设置数据  参一 key  参二 value 且为字符串
localStorage.setItem('code',str)
//获取数据  参数为key  类型为字符串
localStorage.getItem('code')
//删除某一个数据 参数为key 字符串类型
localStorage.removeItem('code')
```

### sessionStorage

* sessionStorage的增删改查

```javascript 
  <script>
        // sessionStorage 返回的是 storage对象 sessionStorage 中所有的数据都存放在这个对象中
        var data = {
            'a': "12344",
            'name': 'yq',
            'img': 'http:www.nihao.com/images/1.png'
        }
        console.log(sessionStorage)
        //  getItem(key,value) 获取数据
        //  setItem(key,value) 添加数据  只能传key-value 键值对；且为字符串的
        //   参一：为key 值；且为字符串 参二：value 且为字符串
        //   注意：setItem 不能传引用类的数据 
        //   如果想要存存对象中的数据。那就遍历对象；在取值储存
        for (x in data) {
            sessionStorage.setItem(x, data[x])
        }
        // removeItem(key) 删除sessionStorage 中数据 只删除当前的 key:value值
        sessionStorage.removeItem('name')
        // clear() 清空sessionStorage 中数据
        // sessionStorage.clear()
        // sesstonStorage：特点：
        // 1:存数据；存入相同属性的数据，以最后一次赋值为准
        // 2：如果浏览器一直不关闭，数据一直缓存，会导致在其他页面中有一些不需要的数据，那么这些第一占了内存，第二：一不小心就有可能成为脏数据。
        //  所以针对以上情况；使用完数据后；全部清空
    </script>

```

* sessionStorage 存储动态数据

```javascript
<label for="">orderID</label>
        <input type="text" id="orderID" value="">
        <label for="">订单价格</label>
        <input type="text" name="" id="orderPrice" value="">
        <label for="">订单份数</label>
        <input type="text" name="" id="orderCount" value="">
        <button>提交到seessionStorage</button>
    <script>
        document.getElementsByTagName('button')[0].onclick = function () {
            sessionStorage.clear()
            var orderID = document.getElementById('orderID').value
            var price = orderPrice.value
            var Count = orderCount.value
            console.log(orderID)
            console.log(price)
            console.log(Count)
            var data = {
                'orderID': orderID,
                'orderPrice': price,
                'count': Count
            }
            for (x in data) {
                sessionStorage.setItem(x, data[x])
            }
        }
    </script>

```

### url传值

```javascript
//第一个界面 
<button>点击跳转Burl传值</button>
  <script>
    // 通过url传值禁止传引用类型数据
    var str = 'aaa'
    document.getElementsByTagName('button')[0].onclick = function () {
      //   window.location.href = './b.html?code=aaaa'
      window.location.href = './b.html?' + 'code' + '=' + str + '&' + 'name=yq'
    }
  </script>

//第二个界面
  <div id="contaner"></div>
  <script>
    //   方式一
    //   获取url 地址  协议://域名.端口/路由地址/参数
    var url = location.href;
    console.log(url)
    //   再遍历字符串,取到参数
    var parms = url.split('?')
    console.log(parms[1])
    var parm = parms[1].split('&')
    console.log(parm) //  code=aaa name=yq
    // 用a页面传过来的数据 
    var parmVal
    for (var i = 0; i < parm.length; i++) {
      var str = parm[i]
      console.log(str)
      var strArr = str.split('=')
      parmVal = strArr[1]
      console.log(parmVal)
      var node = document.createElement('span')
      node.innerHTML = parmVal
      contaner.appendChild(node)
    }


    //  方式二：
    //   var parm = location.search;
    //   console.log(parm) // ?code='aaa'&name=yq
  </script>
```

