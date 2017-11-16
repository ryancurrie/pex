import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <h1>{`Welcome ${localStorage.getItem('username')}`}</h1>
        </div>
        <div className="row">
          <div className="col text-justify">How Pex works.</div>
        </div>
      </div>
    )
  }
}
