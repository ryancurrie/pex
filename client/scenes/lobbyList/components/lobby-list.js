import React from 'react'
import { Link } from 'react-router-dom'

const LobbyList = ({ lobbies }) => {
  return (
    <div className="col">
      <ul className="list-group">
        {lobbies.map(({ lobbyName, lobbyPlayers, full, lobbyURI }, index) => {
          return (
            <li className="list-group-item" style={styles.listItem} key={index}>
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
  listItem: {
    fontWeight: '400',
    width: '100%',
    border: '2px solid #615bb1',
    borderRadius: '0',
    backgroundColor: 'rgba(178, 68, 206, .15)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase'
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  }
}
