import React from 'react'
import { Link } from 'react-router-dom'

const LobbyFooter = () => {
  return (
    <div>
      <div className="col float-left">
        <Link to={{ pathname: '/lobbies' }}>Leave Lobby</Link>
      </div>
    </div>
  )
}

module.exports = LobbyFooter
