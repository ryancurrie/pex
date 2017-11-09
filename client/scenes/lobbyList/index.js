import React, { Component } from 'react'
import SocketIOClient from 'socket.io-client'
import LobbyList from './components/lobby-list'

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

  render() {
    if (!this.state.lobbiesLoaded) {
      return null
    }
    else {
      return (
        <div className="col text-center">
          <div className="row" style={styles}>
            <span>Choose a lobby</span>
          </div>
          <div className="row">
            <LobbyList lobbies={this.state.lobbies} />
          </div>
        </div>
      )
    }
  }
}

const styles = {
  marginBottom: '1.5em'
}
