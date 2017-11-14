import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {
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
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
              />
            </div>
          </div>
          <div className="row">
            <button type="submit" className="btn btn-primary">
              Enter
            </button>
          </div>
        </form>
      </div>
    )
  }
}
