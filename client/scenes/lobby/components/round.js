const uuid = require('uuid/v1')
const Timr = require('timrjs')
const _ = require('lodash')

module.exports = class Round {
  constructor() {
    this.id = uuid()
    this.status = true
    this.timer = Timr('00:00:15')
    this.jackpot = 0
    this.pool = []
    this.raffle = []
  }

  acceptPex(wager) {
    this.jackpot += wager.amount
    this.pool.push(wager)
    for (let i = 0; i < wager.amount; i++) {
      this.raffle.push(wager.player)
    }
    console.log(`${wager.player} Just Bid ${wager.amount}`)
  }

  leaders() {
    return this.pool.reduce((acc, element) => {
      acc[element.player] = {
        player: element.player,
        total:
          (acc[element.player] ? acc[element.player].total : 0) +
          element.amount,
        odds: total / this.jackpot
      }
      return acc
    }, {})
  }

  tally() {
    return this.pool.reduce((acc, element) => {
      const calculatedTotal =
        (acc[element.player] ? acc[element.player].total : 0) + element.amount
      acc[element.player] = {
        player: element.player,
        total: calculatedTotal,
        odds: calculatedTotal / this.jackpot
      }
      return acc
    }, {})
  }

  pickWinner() {
    const length = this.raffle.length
    const random = _.random(length)
    const winner = this.raffle[random]
    console.log(`And this winner is ${winner}! Jackpot ${this.jackpot}`)
  }

  startRound() {
    this.timer
      .start()
      .ticker(({ formattedTime, percentDone }) => {
        console.log(formattedTime)
        switch (percentDone) {
          case 33:
            console.log('1 minute left, current jackpot: ' + this.jackpot)
            break
          case 66:
            console.log('30 seconds left, current jackpot: ' + this.jackpot)
            break
          case 89:
            console.log('10 seconds left, current jackpot: ' + this.jackpot)
        }
      })
      .finish(self => {
        console.log('Round complete!')
        this.status = false
        this.pickWinner()
      })
  }
}
