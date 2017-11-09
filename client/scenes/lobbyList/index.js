import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'

export default class Lobbies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lobbies: null,
      lobbiesLoaded: false
    }
    this.socket = SocketIOClient('http://localhost:3000')
  }

  componentDidMount() {
    this.socket.emit('get-lobbies')
    this.socket.on('return-lobbies', lob => {
      this.setState({
        lobbies: lob,
        lobbiesLoaded: true
      })
    })
  }

  componentWillUnmount() {}

  render() {
    if (this.state.lobbiesLoaded) {
      console.log(this.state.lobbies)
      return (
        <div>
          <h1>Choose a lobby</h1>
        </div>
      )
    }
    else {
      return null
    }
  }
}
