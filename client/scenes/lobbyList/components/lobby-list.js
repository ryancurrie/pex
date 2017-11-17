import React from 'react'
import { Link } from 'react-router-dom'

const LobbyList = ({ lobbies }) => {
  return (
    <div className="col">
      <ul className="list-group">
        {lobbies.map(({ lobbyName, lobbyPlayers, full, lobbyURI }, index) => {
          return (
            <li
              className="list-group-item pex-lobby-list-item"
              style={styles.border}
              key={index}
            >
              <Link style={styles.link} to={{ pathname: `/lobby${lobbyURI}` }}>
                <p>{lobbyName}</p>
                <p>{`Active players: ${lobbyPlayers.length}`}</p>
                <p>{`Status:  ` + (full ? 'Full' : 'Open')}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

module.exports = LobbyList

const styles = {
  link: {
    textDecoration: 'none',
    color: '#fff'
  },
  border: {
    borderRadius: '0'
  }
}
