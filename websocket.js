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

// socket 代表一个客户端，每个连接进来的客户端都有一个 socket
webSocketServer.on('connection', function(socket) {
    // ROUTINE: 连接建立
    console.log('客户端连接成功')

    // 监听对方发过来的消息
    socket.on('message', function(message) {
        x = decodeURI(message)
        console.log('接收到客户端的消息：', x)
        socket.send(x)
    })
})
