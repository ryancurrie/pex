import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

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
        <form onSubmit={this.handleSubmit}>
          <div className="row" style={styles.form}>
            <div className="form-group col-sm-6 offset-sm-3 text-center">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <button type="submit" className="btn btn-primary">
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
  form: {
    marginTop: '3em'
  }
}
