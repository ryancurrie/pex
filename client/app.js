import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './components/header'
import Alerts from './components/alerts'
import Home from './scenes/home/index.js'
import Welcome from './scenes/welcome/index.js'
import Lobbies from './scenes/lobbyList/index.js'
import Lobby from './scenes/lobby/index.js'

export default class App extends Component {
  render() {
    return (
      <div style={styles}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/lobbies" component={Lobbies} />
        <Route path="/lobby/:name" component={Lobby} />
        <Alerts html={true} />
      </div>
    )
  }
}

const styles = {
  fontFamily: 'Roboto, sans-serif',
  fontWeight: '100',
  letterSpacing: '.1em',
  color: '#fff'
}
