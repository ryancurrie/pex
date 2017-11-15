const shortid = require('shortid')
const Timr = require('timrjs')
const _ = require('lodash')

module.exports = class Round {
  constructor(io, lobbyName) {
    this.io = io
    this.lobbyName = lobbyName
    this.timer = Timr('00:1:30')
    this.jackpot = 0
    this.raffle = []
  }

  pickWinner() {
    const length = this.raffle.length
    const random = _.random(length)
    const winner = this.raffle[random]
    this.io.in(this.lobbyName).emit('announce-winner', {
      id: shortid.generate(),
      msg: `And the winner is ${winner}! Jackpot ${this.jackpot}`
    })
    this.io.in(this.lobbyName).emit('award-player', {
      award: this.jackpot,
      winner: winner
    })
    this.jackpot = 0
    this.raffle = []
  }

  startRound() {
    this.io
      .in(this.lobbyName)
      .emit('round-start', { msg: 'A new round has begun!' })
    this.timer
      .start()
      .ticker(({ formattedTime, percentDone }) => {
        this.io.in(this.lobbyName).emit('time-left', formattedTime)
        this.io.in(this.lobbyName).emit('current-jackpot', this.jackpot)
        switch (percentDone) {
          case 33:
            this.io.in(this.lobbyName).emit('announce-jackpot', {
              id: shortid.generate(),
              msg: `1 minute left! Current jackpot: ${this.jackpot}`
            })
            break
          case 66:
            this.io.in(this.lobbyName).emit('announce-jackpot', {
              id: shortid.generate(),
              msg: `30 seconds left! Current jackpot: ${this.jackpot}`
            })
            break
          case 89:
            this.io.in(this.lobbyName).emit('announce-jackpot', {
              id: shortid.generate(),
              msg: `10 seconds left! Current jackpot: ${this.jackpot}`
            })
        }
      })
      .finish(self => {
        this.pickWinner()
        this.io.in(this.lobbyName).emit('alert-new-round', {
          id: shortid.generate(),
          msg: 'New round will begin in 20 seconds!'
        })
        setTimeout(() => {
          this.io.in(this.lobbyName).emit('round-start', {
            id: shortid.generate(),
            msg: 'A new round has begun!'
          })
          this.timer.start()
        }, 2000)
      })
  }

  acceptPex(wager) {
    this.jackpot += wager.amount
    for (let i = 0; i < wager.amount; i++) {
      this.raffle.push(wager.player)
    }
    this.io.in(this.lobbyName).emit('announce-bid', {
      id: shortid.generate(),
      msg: `${wager.player} just bid ${wager.amount}`
    })
  }
}
