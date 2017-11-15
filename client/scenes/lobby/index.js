import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'
import { upperCase } from 'lodash'
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
      jackpot: 0
    }
    this.socket = SocketIOClient('http://localhost:3000')
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
    this.socket.on('playerJoin', update => {
      this.setState({ updates: this.state.updates.concat(update) })
    })
    this.socket.on('playerLeave', update => {
      this.setState({ updates: this.state.updates.concat(update) })
    })
    this.socket.on('round-start', update => {
      this.setState({ updates: this.state.updates.concat(update) })
    })
    this.socket.on('alert-new-round', update => {
      this.setState({ updates: this.state.updates.concat(update) })
    })
    this.socket.on('time-left', update => {
      this.setState({ timeLeft: update })
    })
    this.socket.on('announce-bid', update => {
      this.setState({ updates: this.state.updates.concat(update) })
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
    if (amount > userPex) {
      console.log('fail')
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
