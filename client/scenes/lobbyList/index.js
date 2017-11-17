import React, { Component } from 'react'
import LobbyList from './components/lobby-list'

export default class Lobbies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lobbies: []
    }
  }

  async componentDidMount() {
    const response = await fetch('/api/lobbies')
    const lobbies = await response.json()
    this.setState({ lobbies: lobbies })
  }

  render() {
    if (!this.state.lobbies.length) {
      return null
    }
    else {
      return (
        <div className="col-xs-12 col-sm-4 offset-sm-4 text-center">
          <div className="row" style={styles}>
            <div className="col">
              <h2>Choose A Lobby</h2>
            </div>
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
