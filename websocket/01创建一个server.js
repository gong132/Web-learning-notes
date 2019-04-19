var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080,host:'localhost',Upgrade: 'websocket'});
  console.log(wss)
wss.on('open', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});