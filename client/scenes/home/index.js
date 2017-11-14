import React, { Component } from 'react'

export default class Home extends Component {
  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      username: formData.get('username')
    }
    console.log(JSON.stringify(data))
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
