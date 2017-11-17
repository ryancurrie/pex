import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Logo from './components/logo'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const response = await axios.post('/api/createuser', {
      username: formData.get('username')
    })
    const { username, pinkPex, bluePex, id, roundsWon } = response.data
    localStorage.setItem('id', id)
    localStorage.setItem('username', username)
    localStorage.setItem('pinkPex', pinkPex)
    localStorage.setItem('bluePex', bluePex)
    localStorage.setItem('roundsWon', roundsWon)
    this.setState({ username: true })
  }

  render() {
    const { username } = this.state
    return (
      <div>
        <div className="row">
          <div
            className="col-xs-12 col-sm-4 offset-sm-4 text-center"
            style={styles.column}
          >
            <Logo />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} style={styles.column}>
          <div className="row">
            <div className="col-xs-12 col-sm-4 offset-sm-4">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" className="pex-button">
                Enter
              </button>
            </div>
          </div>
        </form>
        {username && <Redirect to={'/welcome'} />}
      </div>
    )
  }
}

const styles = {
  column: {
    marginTop: '2em'
  },
  input: {
    borderRadius: '0',
    height: '3.5em'
  }
}
