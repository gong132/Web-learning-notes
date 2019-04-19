# jquery 小项目详细文档

## 项目流程

- 学会对项目进行需求分析
- 学会项目基本的脚骨
- 学会将一个项目才分为多个页面，在将一个页面才分为多个小哥功能。在实现功能与功能之间的数据联动，左后实现页面与页面之间的交互
- 本次任务；学会如何简单的架构一个项目，将小的功能放入到页面上。学会才分页面上功能。然后在组合功能

## 项目详细分析

项目分为两个页面；首页和提交订单；

首页分析过程
1：静态页面分析；结构分析；命名规范；属性分析

2：动态页面分析

### 静态首页分析

初始化页面结构代码

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>商品列表页</title>
    <link rel="stylesheet" href="assets/css/common.css">
    <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
    <div class="container">
        <div class="top">
            <h3>龙岩小吃</h3>
        </div>
        <div class="main">
            <div class="left">
                <ul>
                    <li class="cur">
                        <a href="javascript:void(0)" data-type="炒菜">炒菜</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" data-type="商务套餐">商务套餐</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" data-type="主食">主食</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" data-type="其他">其他</a>
                    </li>
                </ul>
            </div>
            <div class="right">
                <ul id="pList">
                     <!-- 页面上结构代码 -->
                <!-- <li>
                    <div class="product-item">
                        <img class="product-img" src="" alt="">
                        <h4 class="product-title"></h4>
                        <p class="product-desc"></p>
                        <span class="product-price"></span>
                        <div class="action">
                            <a href="javascript:vpid(0)" data-pid="10001" class="p-btn-car p-reduce"></a>
                            <span id="pNum" class="p-num" data-price="26" data-pnum="0">0</span>
                            <a href="javascript:vold(0)" class="p-btn-car p-add" data-pid="10001"></a>
                        </div>
                    </div>
                </li> -->
                </ul>
            </div>
        </div>=""
        <div class="footer">
            <span class="btm-pnum">合计<em id="sumPCount">0</em>件商品</span>
            <span class="btm-pprice">总价:<em id="sumPPrice">0</em>元</span>
            <a href="javascript:void(0)" class="btn-sure-order">确认订单</a>
        </div>
    </div>
    <script src="assets/lib/jquery.min.js"></script>
    <script src="assets/lib/jquery.cookie.min.js"></script>
    <script src="assets/js/common.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
~~~

初始化样式； comment.css文件

~~~css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body{
    height: 100%;
}
body,h1,h2,h3,h4,h5,h6,hr,p,blockquote,dl,dt,dd,ul,ol,li,pre,fieldset,legend,button,input,textarea,th,td{margin: 0;padding: 0;}
/* 文字大小12px 行高1.5倍 \5b85\4f53宋体 如果电脑没宋体 taboma arical字体 */
body,button,input,select,textarea{font: 12px/1.5tahoma,arical,\5b8b\4f53;}
h1, h2, h3, h4, h5, h6{ font-size:100%; }
/* 去掉标签的默认样式 */
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:none; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
~~~

实现index.html的静态样式‘ 在main.css 和comment.css文件下

~~~css
/*comment.css 这里写公共的样式部分*/
.container{
    height: 100%;
}
.top{
    background-color: #bb2828;
}
.top h3{
    font-size: 20px;
    color:#eee;
    text-align: center;
    height: 40px;
    line-height: 40px;
}
.main{
    background-color: #ddd;
    height: 100%;
    overflow: scroll;
}
~~~

实现页面静态样式；main.css （这里有提前写好的动态变化的样式）

~~~css
/*页面主体 container start*/

/*左侧商品分类 start*/
.main .left{width:20%;float: left;}
.main .left ul li{width: 100%;line-height: 30px;border-bottom: solid #bbb 1px;}
.main .left ul li a{color: #000;padding:5px;font-size: 14px;width:100%; display: inline-block;}
.main ul li.cur{background-color: #eee;}
/*左侧商品分类部分 end  */

.main .right{background-color:#eee;width:80%;height: 100%;float: right;overflow: scroll; margin-bottom: 40px;}
.main .product-item{width: 100%;display: block;padding: 5px;box-sizing: border-box;}
.main .right li{width: 100%;float: left;}
.main .product-item .product-img{width:100%;max-height: 300px;margin: 0 auto;display: block;}
.main .product-item .product-title{font-size:14px;font-weight: bolder;}
.main .product-item .product-desc{font-size:12px;color: #999;}
.main .product-item .product-price{float: left;}
.main .product-item .product-price i{font-size: 14px;color: #f00;}
.main .product-item .action .p-num{border: solid 1px #999;text-align: center;font-size: 16px;width:30px;display: inline-block;/*display: none;*/}

.main .product-item .action .p-btn-car{width: 26px; height: 26px;font-size: 16px;font-weight: bolder;border-radius: 50%; display: inline-block;background-color: #f00;text-align: center;color: #fff;}
/*.main .product-item .action .p-reduce{
    display: none;
}*/
.main .product-item .action{ float: right;}
.main .product-item .action .btn-buy{ display: inline-block;width: 80px;height: 26px;font-size: 14px;text-align: center;border-radius: 5px;float: right;color: #fff;background-color: #f00;}

/*页面主体 container end*/

/*页面底部 start*/
.footer{ width: 100%;position: fixed;bottom:0;height: 40px;background-color: #fff;box-shadow: 0 -2px 2px grey; /*设置一个阴影效果*/}
.footer span{font-size: 14px;float:left;height: 40px;line-height: 40px;margin-left: 5px;}
.footer span em{ color: #f00;font-weight: bold;font-size: 16px;}
.footer .btn-sure-order{ float: right;text-decoration:none;width:140px;display: inline-block;text-align: center;height: 36px;line-height: 36px;background-color: #bb2828;color: #fff;border-radius: 5px;margin-right: 5px;
}
~~~

### index.html动态功能拆分

切换的数据来 comment.js（根据页面结构自定义的数据）

~~~javascript
/**
 * 自己创建一个商品数据集合
 * 点击分类时实现商品的切换
 * 切换之后已经选择好的数量需要记录
*/
var arrAllProducts = [
    {
        type: "炒菜",
        products: [
            { id: 10001, name: "土猪肉烧红薯", img: "http://recipe1.hoto.cn/pic/recipe/l/ff/4f/1134591_e480ee.jpg", price: 26.00, desc: "红薯与肉香交互辉映，肥而不腻、酥而不碎、甜而不粘、浓而不咸。" },
            { id: 10002, name: "红烧虾园子", img: "http://recipe1.hoto.cn/pic/recipe/l/c3/66/1140419_19dbfb.jpg", price: 28.00, desc: "传统的《桂花酒酿圆子》有现成的卖，自己做也是简单方便口味很不错" },
            { id: 10003, name: "宫保鸡丁", img: "http://recipe0.hoto.cn/pic/recipe/g_148/6a/da/252522_0d88b3.jpg", price: 20.00, desc: "川菜馆必点" }
        ]
    },
    {
        type: "商务套餐",
        products: [
            { id: 20001, name: "荷叶饭", img: "http://recipe0.hoto.cn/pic/recipe/g_148/72/61/1073522_c9b4af.jpg", price: 12.00, desc: "好吃的荷叶饭" },
            { id: 20002, name: "奢华版荷叶饭", img: "http://recipe0.hoto.cn/pic/recipe/g_148/40/f8/849984_c84667.jpg", price: 15.00, desc: "精装版" }
        ]
    },
    {
        type: "主食",
        products: [
            { id: 30001, name: "燕麦南瓜饼", img: "http://recipe1.hoto.cn/pic/recipe/l/45/67/1140549_2cf776.jpg", price: "12.00", desc: "这款燕麦南瓜饼，外皮软糯，内馅香甜" }
        ]
    },
    {
        type: "其他",
        products: [
            { id: 40001, name: "苏格兰蛋", img: "http://recipe0.hoto.cn/pic/recipe/l/2a/67/1140522_c0045b.jpg", price: "25.80", desc: "据说这叫苏格兰蛋。其实油炸的我吃得少做的更少" }
        ]
    }
]

~~~

1：tab切换：分为切换样式，切换数据（渲染到 #pList标签中）

```js
//  A代码 实现切换样式
  // 功能一 左边导航tab切换
    $('.left li').click(function(){
        // 删除所有的Li 的cur 的样式
        $(this).parent().find('li').removeClass('cur') 
        $(this).addClass('cur') // 当前被选中的列表添加样式
        
        // 切换数据；(每次切换数据都是数据刷新过程；所以首先要清空之前的数据；再加载新的数据)
        // 、、、
    })

```

为了实现数据；所以先封装一个：初始化html 的代码（也即是将数据渲染到view上）

~~~javascript
// b代码中
// initPList 初始化数据列表的主要功能   参数：传入的数据(实物列表数据) 
//  data == product[i]
function initPList(data){
        var strHtml = '' 
        data.forEach(item=>{
            strHtml += `<li>
                        <div class="product-item">
                            <img class="product-img" src="${item.img}" alt="${item.name}">
                            <h4 class="product-title">${item.name}</h4>
                            <p class="product-desc">${item.desc}</p>
                            <span class="product-price"><i>${item.price}</i>元</span>
                            <div class="action">
                                <a href="javascript:void(0)" data-pid="${item.id}" class="p-btn-car p-reduce">-</a>
                                <span class="p-num" id="pNum${item.id}" data-pid="${item.id}" data-price="${item.price}" data-pnum="${tmpCount}">${tmpCount}</span>
                                <a href="javascript:void(0)" data-pid="${item.id}" class="p-btn-car p-add">+</a>
                            </div>
                        </div>
                    </li>`
        })
        $('#pList').html(strHtml) 
    }
~~~

实现tab切换数据

~~~javascript
//    将下面的代码；放入到tab切换 A代码中

/** 切换数据；就是数据获取 和遍历的的过程；遍历有InitPList()方法
 * 获取对应数据：首先要找到 每一个tab 的唯一识别身份  就是data-type 的值不同
 * 获取数据中的 type数据； 将标签中data-type值与type数据进行比较；如果是则，返回顺列表；
 * 调用initPList() 将数据渲染到页面上
 */
// data() 方法向被选元素附加数据，或者从被选元素获取数据。
        var tmpType = $(this).find('a').data('type') //获取商品分类值(标签中 data-type属性的值)
        var tmpPdata = arrAllProducts.find(function(item){
            if(item.type == tmpType){
                return item // 返回列表信息
            }
        })
        
        initPList(tmpPdata.products) //  页面初始化渲染数据
~~~

2：订单中计数器功能

  单独的计数器很好实现。但是每个不同的食品都需要有计数器；并且还要分类绑定数据。需要找我方式了

- 多个商品中，并且每个商品都有计数器时候，我们需要知道当前加减的是哪个商品。
- 因为区分商品唯一标志就是商品的ID  ，所以应该将商品的ID 放入到计数器组件中，来实现，知道+-是哪个商品
- 总结：只要与商品有关的组件。需要区分是哪个商品的数据；就需要通过ID 来识别

~~~javascript
/** D代码
     * 根据操作类型和产品id修改购买数量值
     * 参一：计数器的类型(+-) 参二：data-pum 的值，主要作用可以区分点击是加 还是减  tmpId 接受的是；商品的id
     */
    function dalPNum(type,tmpId){
        var $tagPNum = $('#pNum'+tmpId) //获取当前商品的商品数量标签
        var tmpNum = Number($tagPNum.data('pnum')) //把当前的数量转换为数字
         // 实现计数器功能 
        if(type=="add"){
            tmpNum += 1 //修改数量值
        }
        else{
            tmpNum -= 1 //修改数量值
        }
        if(tmpNum<0){
            return
        }
        $tagPNum.data('pnum',tmpNum) //修改当前订购数量的值
        $tagPNum.text(tmpNum) //修改显示的数量的值
      
    }

~~~

点击 + 或者—实现计数器功能

~~~javascript
 ///通过on添加事件 可以处理动态添加的标签
    $('#pList').on('click','.p-add', function () {
        // 点击+ 时候；获取data-pid 的值 值为当前商品的ID (浏览器可以知道用户点击的是按个商品的计数器)
        var tmpId = $(this).data('pid') 
        dalPNum('add',tmpId)
    })
    $('#pList').on('click','.p-reduce', function () {
        var tmpId = $(this).data('pid')
        dalPNum('reduce',tmpId)
    })
~~~

3：实现购物车功能

原理计数器+- 与显示计数信息 与 商品信息；以及 价钱；之间关系

1： 需要在全局定义一个 变量；用来存放购物所有购物车商品数据

2： 购物车总价钱 = 商品单价*数量 之和

~~~javascript
    var arrAllCart = [] // 所有的加入购物车的商品数据
~~~

3：将添加商品个数显示到页面上，所以这个代码应该翻入到 initPList方法中；并且在渲染数据之前

~~~javascript
  // 将下列代码放入到B中
var tmpP = arrAllCart.find(function(p){ // p为当前的 数据对象
                return p.pid == item.id
            })
            var tmpCount = 0 //记录的商品数量值 默认为0 如果购物车中存在那么使用购物车中的值
            if(tmpP){
                tmpCount = tmpP.count
            }
~~~

4： 保存用户+- 商品信息，将商品内容放啊如到购物车中

~~~javascript
// 将下列代码放入到代码D中

// 声明一个对象；用来存放；商品信息
        var obj = {}
        obj.pid = tmpId // 商品ID 
        obj.count = tmpNum // 商品数量
        obj.price = Number($tagPNum.data('price')) //取当前商品价格

        var pIndex = arrAllCart.findIndex(function(item){
            return item.pid == obj.pid
        })//获取当前商品在所有购物车商品数组中的索引值
        if(pIndex>-1){
            arrAllCart[pIndex] = obj //存在进行替换操作
        }
        else{
            arrAllCart.push(obj) //不存在进行插入操作
        }
        console.dir(arrAllCart)
        var sumCount = 0 //总数量
        var sumPrice = 0 //总价格
        arrAllCart.forEach(function(item){
            sumCount += item.count
            sumPrice += (item.count * item.price)
        })
        $('#sumPCount').text(sumCount)
        $('#sumPPrice').text(sumPrice.toFixed(2)) //显示的时候保留两位小数点
~~~



### 点击提交订单

~~~javascript
   //确认提交订单按钮点击事件
    $('.btn-sure-order').click(function(){
        //把所选择的购物商品信息加入cookie
        //此处使用jquery-cookie插件
        //地址为:https://github.com/carhartl/jquery-cookie
        //path      路径,此处设置在整个网站有效
        //expires   存在时间,此处设置有效期为7天
        $.cookie('shopcart',JSON.stringify(arrAllCart),{path:'/',expires:7})
        window.location.href = "order.html"//页面跳转
    })
~~~

