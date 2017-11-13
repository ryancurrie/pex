const uuid = require('uuid/v4')
const shortid = require('shortid')
const generate = require('project-name-generator')
const _ = require('lodash')

module.exports = class Lobby {
  constructor(io) {
    this.io = io
    this.id = uuid()
    this.lobbyName = _.startCase(generate({ alliterative: true }).dashed)
    this.lobbyURI = '/' + _.kebabCase(this.lobbyName)
    this.lobbySlug = _.kebabCase(this.lobbyName)
    this.lobbyPlayers = []
    this.updates = []
  }

  playerJoin(id) {
    this.lobbyPlayers.push(id)
    const update = {
      id: shortid.generate(),
      msg: `${id} joined the room`
    }
    this.updates.push(update)
    this.io.in(this.lobbySlug).emit('playerJoin', update)
  }

  playerLeave(id) {
    const index = this.lobbyPlayers.indexOf(id)
    if (index > -1) {
      const update = {
        id: shortid.generate(),
        msg: `${id} has left the room`
      }
      this.lobbyPlayers.splice(index, 1)
      this.updates.push(update)
      this.io.in(this.lobbySlug).emit('playerLeave', update)
    }
  }

  toJSON() {
    return {
      id: this.id,
      lobbyName: this.lobbyName,
      lobbyURI: this.lobbyURI,
      lobbySlug: this.lobbySlug,
      lobbyPlayers: this.lobbyPlayers,
      updates: this.updates
    }
  }
}
