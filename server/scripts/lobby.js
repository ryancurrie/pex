const uuid = require('uuid/v4')
const generate = require('project-name-generator')
const _ = require('lodash')

module.exports = class Lobby {
  constructor() {
    this.id = uuid()
    this.lobbyName = _.startCase(generate({ alliterative: true }).dashed)
    this.lobbyURI = '/' + _.kebabCase(this.lobbyName)
    this.lobbySlug = _.kebabCase(this.lobbyName)
    this.lobbyPlayers = []
    this.full = false
  }

  checkFull() {
    if (this.lobbyPlayers.length < 10) {
      this.full = false
    }
    else {
      this.full = true
    }
  }

  playerJoin(player) {
    const lobbyFull = 'Sorry this lobby is full'
    if (this.full) {
      console.log(lobbyFull)
    }
    else {
      this.lobbyPlayers.push(player)
      this.checkFull()
    }
  }

  playerLeave({ username }) {
    this.lobbyPlayers = this.lobbyPlayers.filter(el => {
      return el.username !== username
    })
    this.checkFull()
  }
}
