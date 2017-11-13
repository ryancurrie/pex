import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'
import LobbyUpdates from './components/lobby-updates'

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      room: props.match.params.name,
      updates: []
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
        <div className="row">
          <div className="col text-center">{this.state.room}</div>
        </div>
        <div className="row">
          <div className="col float-left">Time left:</div>
          <div className="col float-right">Jackpot</div>
        </div>
        <div className="row">
          <LobbyUpdates updates={this.state.updates} />
        </div>
      </div>
    )
  }
}
