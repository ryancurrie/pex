import React from 'react'
import { Link } from 'react-router-dom'

const LobbyFooter = props => {
  return (
    <div>
      <div className="row justify-content-center">
        <h6>{`Pex: ${props.pex}`}</h6>
      </div>
      <form onSubmit={props.handleSubmit}>
        <div className="row justify-content-center">
          <div className="w-50">
            <div className="form-group">
              <input
                name="enterPex"
                type="number"
                placeholder="Enter Pex"
                className="form-control"
                style={styles.input}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center" style={styles.column}>
          <div className="w-50">
            <button className="pex-button">Place bet</button>
          </div>
        </div>
        <div className="float-left">
          <Link to={{ pathname: '/lobbies' }} style={styles.leave}>
            Leave Lobby
          </Link>
        </div>
      </form>
    </div>
  )
}

const styles = {
  column: {
    marginBottom: '1.5em'
  },
  input: {
    borderRadius: '0',
    height: '3.5em'
  },
  leave: {
    color: '8B819D',
    fontSize: '.9em',
    textDecoration: 'none'
  }
}

module.exports = LobbyFooter
