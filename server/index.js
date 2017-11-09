const path = require('path')
const express = require('express')
const IO = require('socket.io')
const http = require('http')
const Lobby = require('./scripts/lobby')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const server = http.createServer(app)
const io = IO(server)

const lobbies = []

if (lobbies.length === 0) {
  lobbies.push(new Lobby())
}

io.on('connect', socket => {
  socket.on('get-lobbies', () => {
    console.log('sent lobbies')
    socket.emit('return-lobbies', lobbies)
  })
})

server.listen(3000, () => {
  console.log('Port 3000')
})
