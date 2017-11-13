const path = require('path')
const express = require('express')
const IO = require('socket.io')
const http = require('http')
const Lobby = require('./scripts/lobby')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const io = IO(server)

const lobbies = [new Lobby()]
const room = lobbies[0].lobbySlug
console.log(room)

io.on('connect', socket => {
  socket.on('get-lobbies', () => {
    socket.emit('return-lobbies', lobbies)
  })

  socket.on('join', room => {
    socket.join(room)
    io.sockets.in(room).emit('test', 'test')
  })
})

server.listen(3000, () => {
  console.log('Port 3000')
})
