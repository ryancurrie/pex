import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'

export default class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      join: props.match.params.name,
      updates: []
    }
    this.socket = SocketIOClient('http://localhost:3000')
  }

  componentDidMount() {
    this.socket.emit('join', this.state.join)
    this.socket.on('test', test => {
      console.log(test)
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.join}</h1>
      </div>
    )
  }
}
