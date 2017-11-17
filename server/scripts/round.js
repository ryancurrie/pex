const shortid = require('shortid')
const Timr = require('timrjs')
const _ = require('lodash')

module.exports = class Round {
  constructor(io, lobbyName) {
    this.io = io
    this.lobbyName = lobbyName
    this.timer = Timr('00:00:10')
    this.jackpot = 0
    this.raffle = []
    this.pool = []
    this.open = true
  }

  pickWinner() {
    const length = this.raffle.length
    const random = _.random(0, length - 1)
    const winningPlayer = this.raffle[random]
    if (!winningPlayer) {
      this.jackpot = 0
      this.raffle = []
      this.pool = []
      return this.io.in(this.lobbyName).emit('award-player', {
        award: this.jackpot,
        winner: null,
        id: null
      })
    }
    const winner = winningPlayer.player
    const id = winningPlayer.id
    this.io.in(this.lobbyName).emit('update', {
      id: shortid.generate(),
      msg: `And the winner is ${winner}! Jackpot ${this.jackpot}`
    })
    this.io.in(this.lobbyName).emit('award-player', {
      award: this.jackpot,
      winner: winner,
      id: id
    })
    this.jackpot = 0
    this.raffle = []
    this.pool = []
  }

  getWarning(percent) {
    switch (percent) {
      case 33:
        return '1 minute left!'
      case 66:
        return '30 seconds left!'
      case 89:
        return '10 seconds left!'
      default:
        return null
    }
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
        const msg = this.getWarning(percentDone)
        if (!msg) return
        this.io.in(this.lobbyName).emit('update', {
          id: shortid.generate(),
          msg
        })
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
        }, 2000)
      })
  }

  tally() {
    return this.pool.reduce((acc, element) => {
      const calculatedTotal =
        (acc[element.id] ? acc[element.id].total : 0) + element.amount
      acc[element.id] = {
        id: element.id,
        player: element.player,
        total: calculatedTotal,
        odds: Math.round(calculatedTotal / this.jackpot * 100) + '%'
      }
      return acc
    }, {})
  }

  findPlayer(id) {
    const leaders = this.tally()
    return _.find(leaders, { id: id })
  }

  acceptPex(wager) {
    if (this.open) {
      this.jackpot += wager.amount
      this.pool.push(wager)
      for (let i = 0; i < wager.amount; i++) {
        this.raffle.push(wager)
      }
    }

    const player = this.findPlayer(wager.id)
    const { total, odds } = player

    this.io.in(this.lobbyName).emit('update', {
      id: shortid.generate(),
      msg: `${wager.player} just bid ${wager.amount}`,
      sub: `Total: ${total} Chance to win: ${odds}`
    })
  }
}
