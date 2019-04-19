const ws = require('nodejs-websocket')


let count = 0;//记录总人数

const TYPE_LEAVE = 0;
const TYPE_ENTER = 1;
const TYPE_MSG = 2;

const server = ws.createServer(connect => {
  console.log('新的连接')
  count ++
  connect.userName = `用户${count}`

  // 1.告诉所有人,有人加入聊天室
  broadcast({
    type:TYPE_ENTER,
    msg:`${connect.userName}进入了聊天室`,
    time:new Date().toLocaleTimeString()
  })

  connect.on('text',data => {
    // 2.当接收到某个用户消息的时候,告诉所有人
    broadcast({
      type:TYPE_MSG,
      msg:data,
      time:new Date().toLocaleTimeString()
    })
  })
  connect.on('close',data => {

    count --
    // 3.告诉所有人有人离开了
    broadcast({
      type:TYPE_LEAVE,
      msg:`${connect.userName}离开了聊天室`,
      time:new Date().toLocaleTimeString()
    })
  })
  connect.on('error',data => {})

})

// 广播,给所有用户发消息
function broadcast(msg){
  server.connections.forEach(item => {
    item.send(JSON.stringify(msg))
  })
}

server.listen(3000, () => {
  console.log('websocket 服务启动成功,监听了3000端口')
})