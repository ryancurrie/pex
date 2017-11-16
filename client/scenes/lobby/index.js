import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'
import { upperCase } from 'lodash'
import Alert from 'react-s-alert'
import TimeLeft from './components/time-left'
import Jackpot from './components/jackpot'
import LobbyUpdates from './components/lobby-updates'
import LobbyFooter from './components/lobby-footer'

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      room: props.match.params.name,
      lobby: {},
      updates: [],
      timeLeft: null,
      jackpot: 0,
      roundIsOpen: true
    }
    this.socket = SocketIOClient('/')
    this.payload = {
      room: this.state.room,
      username: localStorage.getItem('username')
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.socket.emit('join', this.payload)
    this.socket.emit('get-lobby', this.state.room)
    this.socket.on('return-lobby', lobby => {
      this.setState({ lobby: lobby, updates: lobby.updates })
    })
    this.socket.on('update', update => {
      this.setState({ updates: this.state.updates.concat(update) })
    })
    this.socket.on('round-start', update => {
      this.setState({
        updates: this.state.updates.concat(update),
        roundIsOpen: true
      })
    })
    this.socket.on('alert-new-round', update => {
      this.setState({
        updates: this.state.updates.concat(update),
        roundIsOpen: false
      })
    })
    this.socket.on('time-left', update => {
      this.setState({ timeLeft: update })
    })
    this.socket.on('current-jackpot', update => {
      this.setState({ jackpot: update })
    })
    this.socket.on('award-player', ({ winner, award }) => {
      const player = localStorage.getItem('username')
      const userPex = Number(localStorage.getItem('pinkPex'))
      if (winner === player) {
        const newBalance = userPex + award
        localStorage.setItem('pinkPex', newBalance)
      }
      let announcement
      if (!winner) {
        announcement = `<div class="text-center">
        <h3>Round Complete!</h3>
        <h3>No Winner This Round</h3>
      </div>`
      }
      else {
        announcement = `
      <div class="text-center">
        <h3>Round Complete!</h3>
        <h4>${winner} Wins</h4>
        <h4>Jackpot ${award}</h4>
      </div>`
      }
      Alert.info(announcement, {
        position: 'top',
        effect: 'jelly',
        html: true,
        beep: false,
        timeout: 2000,
        offset: 250
      })
    })
    this.socket.on('round-closed', () => {
      Alert.error(
        `
      <div class="text-center">
        <h3>Round is not open!</h3>
      </div>`,
        {
          position: 'top',
          effect: 'jelly',
          html: true,
          beep: false,
          timeout: 2000,
          offset: 250
        }
      )
    })
  }

  componentWillUnmount() {
    this.socket.emit('leave', this.payload)
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userPex = Number(localStorage.getItem('pinkPex'))
    const amount = Number(formData.get('enterPex'))

    if (!this.state.roundIsOpen || amount > userPex) {
      const notEnough = `
    <div class="text-center">
      <h3>Not enough Pex!</h3>
    </div>`
      const roundClosed = `
    <div class="text-center">
      <h3>Round not open!</h3>
    </div>`
      Alert.error(this.state.roundIsOpen ? notEnough : roundClosed, {
        position: 'top',
        effect: 'jelly',
        html: true,
        beep: false,
        timeout: 2000,
        offset: 250
      })
    }
    else {
      const wager = {
        player: localStorage.getItem('username'),
        amount: amount
      }
      const balance = userPex - amount
      localStorage.setItem('pinkPex', balance)
      this.socket.emit('enter-pex', wager)
    }
  }

  render() {
    return (
      <div>
        <div className="row" style={styles.column}>
          <div className="col text-center">{upperCase(this.state.room)}</div>
        </div>
        <div className="row" style={styles.column}>
          <div className="col float-left">
            <TimeLeft time={this.state.timeLeft} />
          </div>
          <div className="col">
            <Jackpot jackpot={this.state.jackpot} />
          </div>
        </div>
        <div className="row" style={styles.column}>
          <div className="col text-center" style={styles.updates}>
            <LobbyUpdates updates={this.state.updates} />
          </div>
        </div>
        <LobbyFooter
          pex={localStorage.getItem('pinkPex')}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const styles = {
  column: {
    marginBottom: '1.5em'
  },
  updates: {
    height: '300px',
    width: 'auto',
    marginBottom: '1.5em',
    overflowY: 'scroll',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch'
  }
}
