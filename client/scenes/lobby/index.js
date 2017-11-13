import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'
import { upperCase } from 'lodash'
import TimeLeft from './components/time-left'
import Jackpot from './components/jackpot'
import LobbyUpdates from './components/lobby-updates'

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      room: props.match.params.name,
      updates: [],
      timeLeft: null,
      jackpot: 0
    }
    this.socket = SocketIOClient('http://localhost:3000')
  }

  componentDidMount() {
    this.socket.emit('join', this.state.room)
    this.socket.on('playerJoin', update => {
      this.setState({ updates: this.state.updates.concat(update) })
      console.log(this.state.updates)
    })
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
        <div className="row">
          <div className="col text-center">
            <p>asldkfjskljf alskfdjalsk;jf aslkasjf askljfsda asdl;kfjasdf.</p>
          </div>
        </div>
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
    marginBottom: '1.5em',
    overflowY: 'scroll',
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch'
  }
}
