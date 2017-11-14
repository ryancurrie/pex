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
        <div className="col text-center">
          <div className="row" style={styles}>
            <div className="col text-center">
              <span>{`Welcome ${localStorage.getItem(
                'username'
              )} choose a lobby`}</span>
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
