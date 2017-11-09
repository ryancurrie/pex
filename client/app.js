import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './components/header'
import Lobbies from './scenes/lobbyList/index.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route path="/lobbies" component={Lobbies} />
      </div>
    )
  }
}
