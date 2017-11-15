import React from 'react'
import { Link } from 'react-router-dom'

const LobbyFooter = props => {
  return (
    <div>
      <div className="row justify-content-md-center justify-content-sm-center">
        <div
          className="col-md-auto justify-content-sm-center text-center"
          style={styles.column}
        >
          <form className="form-inline" onSubmit={props.handleSubmit}>
            <div className="mx-sm-3">
              <input
                name="enterPex"
                type="number"
                placeholder="Enter Pex"
                className="form-control"
              />
            </div>
            <div>
              <button className="btn btn-primary">Go</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col float-left">
          <span className="float-left">
            <Link to={{ pathname: '/lobbies' }}>Leave Lobby</Link>
          </span>
        </div>
        <div className="col">
          <span className="float-right">{`Pex: ${props.pex}`}</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  column: {
    marginBottom: '1.5em'
  }
}

module.exports = LobbyFooter
