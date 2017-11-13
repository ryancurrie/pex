import React from 'react'

const renderUpdate = ({ id, msg }) => (
  <li className="list-group-item" key={id}>
    {msg}
  </li>
)

const LobbyUpdates = ({ updates }) => {
  return (
    <div>
      <ul className="list-group">{updates.reverse().map(renderUpdate)}</ul>
    </div>
  )
}

module.exports = LobbyUpdates
