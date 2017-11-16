import React from 'react'

const renderUpdate = ({ id, msg, sub }) => (
  <li className="list-group-item" key={id}>
    <div>{msg}</div>
    <div style={styles.sub}>{sub}</div>
  </li>
)

const LobbyUpdates = ({ updates }) => {
  return (
    <div>
      <ul className="list-group">
        {updates
          .slice()
          .reverse()
          .map(renderUpdate)}
      </ul>
    </div>
  )
}

module.exports = LobbyUpdates

const styles = {
  sub: {
    fontSize: '.75em'
  }
}
