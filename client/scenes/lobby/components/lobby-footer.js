import React from 'react'
import { Link } from 'react-router-dom'

const LobbyFooter = props => {
  return (
    <div>
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

module.exports = LobbyFooter
