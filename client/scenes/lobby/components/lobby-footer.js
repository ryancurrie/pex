import React from 'react'
import { Link } from 'react-router-dom'

const LobbyFooter = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <input
            name="enterPex"
            type="number"
            placeholder="Enter Pex"
            className="form-control"
            style={styles.input}
          />
        </div>

        <button className="pex-button">Place bet</button>
        <div style={styles.leave}>
          <Link to={{ pathname: '/lobbies' }}>Leave Lobby</Link>
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
    marginTop: '1em',
    color: '8B819D',
    fontSize: '.9em',
    textDecoration: 'none'
  }
}

module.exports = LobbyFooter
