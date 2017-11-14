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

const lobbies = [new Lobby()]

app.post('/api/createuser', jsonParser, async (req, res) => {
  const created = await new User(req.body.username)
  res.status(201).json(created)
})

io.on('connect', socket => {
  socket.on('get-lobbies', () => {
    console.log('sent lobbies')
    socket.emit('return-lobbies', lobbies)
  })
})

server.listen(3000, () => {
  console.log('Port 3000')
})
