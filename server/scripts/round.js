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
    this.pool = []
    this.open = true
  }

  pickWinner() {
    const length = this.raffle.length
    const random = _.random(length)
    const winner = this.raffle[random]
    this.io.in(this.lobbyName).emit('update', {
      id: shortid.generate(),
      msg: `And the winner is ${winner}! Jackpot ${this.jackpot}`
    })
    this.io.in(this.lobbyName).emit('award-player', {
      award: this.jackpot,
      winner: winner
    })
    this.jackpot = 0
    this.raffle = []
    this.pool = []
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
            this.io.in(this.lobbyName).emit('update', {
              id: shortid.generate(),
              msg: `1 minute left! Current jackpot: ${this.jackpot}`
            })
            break
          case 66:
            this.io.in(this.lobbyName).emit('update', {
              id: shortid.generate(),
              msg: `30 seconds left! Current jackpot: ${this.jackpot}`
            })
            break
          case 89:
            this.io.in(this.lobbyName).emit('update', {
              id: shortid.generate(),
              msg: `10 seconds left! Current jackpot: ${this.jackpot}`
            })
        }
      })
      .finish(self => {
        this.open = false
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
          this.open = true
          this.timer.start()
        }, 20000)
      })
  }

  tally() {
    return this.pool.reduce((acc, element) => {
      const calculatedTotal =
        (acc[element.player] ? acc[element.player].total : 0) + element.amount
      acc[element.player] = {
        player: element.player,
        total: calculatedTotal,
        odds: Math.round(calculatedTotal / this.jackpot * 100) + '%'
      }
      return acc
    }, {})
  }

  findPlayer(player) {
    const leaders = this.tally()
    return _.find(leaders, { player: player })
  }

  acceptPex(wager) {
    if (this.open) {
      this.jackpot += wager.amount
      this.pool.push(wager)
      for (let i = 0; i < wager.amount; i++) {
        this.raffle.push(wager.player)
      }
    }

    const player = this.findPlayer(wager.player)
    const { total, odds } = player

    this.io.in(this.lobbyName).emit('update', {
      id: shortid.generate(),
      msg: `${wager.player} just bid ${wager.amount}`,
      sub: `Total: ${total} Chance to win: ${odds}`
    })
  }
}
