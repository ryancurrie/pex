const shortid = require('shortid')
const Timr = require('timrjs')

module.exports = class Round {
  constructor(io, lobbyName) {
    this.io = io
    this.lobbyName = lobbyName
    this.timer = Timr('00:00:16')
  }

  startRound() {
    this.io
      .in(this.lobbyName)
      .emit('round-start', { msg: 'A new round has begun!' })
    this.timer
      .start()
      .ticker(({ formattedTime }) => {
        this.io.in(this.lobbyName).emit('time-left', formattedTime)
      })
      .finish(self => {
        const idWill = shortid.generate()
        const idBegin = shortid.generate()
        this.io.in(this.lobbyName).emit('alert-new-round', {
          id: idWill,
          msg: 'New round will begin in 2 seconds!'
        })
        setTimeout(() => {
          this.io.in(this.lobbyName).emit('round-start', {
            id: idBegin,
            msg: 'A new round has begun!'
          })
          this.timer.start()
        }, 2000)
      })
  }
}
