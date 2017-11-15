const shortid = require('shortid')
const Timr = require('timrjs')

module.exports = class Round {
  constructor(io, lobbyName) {
    this.io = io
    this.lobbyName = lobbyName
    this.timer = Timr('00:00:16')
    this.pool = []
    this.jackpot = 0
    this.raffle = []
  }

  startRound() {
    this.io
      .in(this.lobbyName)
      .emit('round-start', { msg: 'A new round has begun!' })
    this.timer
      .start()
      .ticker(({ formattedTime }) => {
        this.io.in(this.lobbyName).emit('time-left', formattedTime)
        this.io.in(this.lobbyName).emit('current-jackpot', this.jackpot)
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

  acceptPex(wager) {
    this.jackpot += wager.amount
    this.pool.push(wager)
    for (let i = 0; i < wager.amount; i++) {
      this.raffle.push(wager.player)
    }
    this.io.in(this.lobbyName).emit('announce-bid', {
      id: shortid.generate(),
      msg: `${wager.player} Just Bid ${wager.amount}`
    })
  }
}
