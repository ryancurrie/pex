const path = require('path')
const express = require('express')
const IO = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser')
const User = require('./scripts/user')
const Lobby = require('./scripts/lobby')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
const jsonParser = bodyParser.json()

const server = http.createServer(app)
const io = IO(server)

const lobbies = [new Lobby(io)]

app.get('/api/lobbies', (req, res) => {
  res.json(lobbies)
})

app.post('/api/createuser', jsonParser, async (req, res) => {
  const created = await new User(req.body.username)
  res.status(201).json(created)
})

io.on('connect', socket => {
  socket.on('get-lobbies', () => {
    socket.emit('return-lobbies', lobbies)
  })

  socket.on('join', ({ room, username }) => {
    socket.join(room)
    lobbies[0].playerJoin(username)
  })

  socket.on('leave', ({ room, username }) => {
    socket.leave(room)
    lobbies[0].playerLeave(username)
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
