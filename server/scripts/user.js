const uuid = require('uuid/v4')

module.exports = class User {
  constructor(username) {
    this.id = uuid()
    this.username = username
    this.pinkPex = 1000
    this.bluePex = 0
    this.roundsWon = 0
  }
}
