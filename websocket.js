/*
 * 文件名：Server.js
 * 创建时间：2021 Sept. 23
 * 作者：刘鹏
 * 文件描述：Node.js 后端代码，用于提供用户服务
*/



let express = require('express')
let app = express()
app.use(express.static(__dirname))

// http服务器
app.listen(3000)

let WebSocketServer = require('ws').Server
// 用 ws 模块启动一个websocket服务器,监听了9999端口

let webSocketServer = new WebSocketServer({ port: 9999 })
// 监听客户端的连接请求  当客户端连接服务器的时候，就会触发connection事件

// ws (webSocket) 代表一个客户端，每个连接进来的客户端都有一个 ws
webSocketServer.on('connection', function connection(ws) {
    // ROUTINE: 连接建立
    console.log('客户端连接成功')

    // 监听对方发过来的 json
    ws.on('message', function incomming(message) {
        var received_msg = JSON.parse(message)
        console.log('============ NEW MESSAGE RECEIVED ============')
        console.log('接收到客户端的消息')
        console.log('已通关如下游戏：')
        for (var i = 0; i < received_msg.games.length; i++) {
            console.log('关卡名称：' + received_msg.games[i].gameName)
            console.log('通关内容:' + received_msg.games[i].xml)
            console.log("-----------------------NEW-----------------------")
        }
        let respond = {'status':'server 已经收到了你的消息~'}
        ws.send(JSON.stringify(respond))
    })
})
