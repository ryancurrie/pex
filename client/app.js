import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './components/header'
import Home from './scenes/home/index.js'
import Lobbies from './scenes/lobbyList/index.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/lobbies" component={Lobbies} />
      </div>
    )
  }
}
