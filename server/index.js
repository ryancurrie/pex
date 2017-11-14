const path = require('path')
const express = require('express')
const IO = require('socket.io')
const http = require('http')
const shortid = require('shortid')
const Lobby = require('./scripts/lobby')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const io = IO(server)

const lobbies = [new Lobby(io)]

app.get('/api/lobbies', (req, res) => {
  res.json(lobbies)
})

io.on('connect', socket => {
  socket.on('get-lobbies', () => {
    socket.emit('return-lobbies', lobbies)
  })

  socket.on('join', room => {
    socket.join(room)
    lobbies[0].playerJoin(socket.id)
  })

  socket.on('leave', room => {
    socket.leave(room)
    lobbies[0].playerLeave(socket.id)
  })

  socket.on('disconnect', () => {
    lobbies[0].playerLeave(socket.id)
  })

  socket.on('get-lobby', () => {
    socket.emit('return-lobby', lobbies[0])
  })
})

server.listen(3000, () => {
  console.log('Port 3000')
})
