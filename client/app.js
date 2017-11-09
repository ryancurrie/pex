import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Lobbies from './scenes/lobbyList/index.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Route path="/lobbies" component={Lobbies} />
      </div>
    )
  }
}
