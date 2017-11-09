import React from 'react'
import { Link } from 'react-router-dom'

const LobbyList = ({ lobbies }) => {
  return (
    <div>
      <ul className="list-group">
        {lobbies.map(({ lobbyName, lobbyPlayers, full, lobbyURI }, index) => {
          return (
            <li className="list-group-item" key={index}>
              <Link to={`/lobby${lobbyURI}`}>
                {`${lobbyName} - Active players:
            ${lobbyPlayers.length} - Status: ` + (full ? 'Full' : 'Open')}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

module.exports = LobbyList
