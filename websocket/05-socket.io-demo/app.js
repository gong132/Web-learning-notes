var app = require('http').createServer(handler)

var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var io = require('socket.io')(app);

io.on('connection', function (socket) {//监听用户连接事件
  console.log('有用户连接了')
  // socket.emit方法表示给浏览器发送数据
  // 参数1是事件的名称,前端监听的就是这个事件名
  socket.emit('anyEventName', { hello: 'world' });
  socket.on('another anyEventName', function (data) {
    console.log(data);
  });
});