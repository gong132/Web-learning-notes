const ws = require('nodejs-websocket')

const server = ws.createServer(connect => {
  console.log('有用户连接上了')
  connect.on('text', data => {
    console.log('接收到用户的数据' + data)
    // 给用户响应结果
    // 对用户发过来的数据进行处理
    connect.send(data.toUpperCase())
  })

  // 连接断开触发
  connect.on('close', () => {
    console.log('连接断开了')
  })

  // 注册一个error,处理用户的错误信息
  connect.on('error', () => {
    console.log('用户连接异常')
  })
})



server.listen(3000, () => {
  console.log('websocket 服务启动成功,监听了3000端口')
})