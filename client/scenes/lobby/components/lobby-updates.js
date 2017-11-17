import React from 'react'
import Transition from 'react-motion-ui-pack'

const renderUpdate = ({ id, msg, sub }) => (
  <li style={pexActivityListItem} key={id}>
    <div> {msg}</div>
    <div style={subMsg}>{sub}</div>
  </li>
)

const LobbyUpdates = ({ updates }) => {
  return (
    <div className="panel panel-default">
      <div className="text-muted">Activity</div>
      <ul style={pexActivityList}>
        <Transition
          enter={{
            opacity: 1
          }}
        >
          {updates
            .slice()
            .reverse()
            .map(renderUpdate)}
        </Transition>
      </ul>
    </div>
  )
}

module.exports = LobbyUpdates

const subMsg = {
  sub: {
    fontSize: '.75em'
  }
}

const pexActivityList = {
  margin: '0',
  padding: '0',
  listStyleType: 'none',
  maxHeight: '400px',
  border: '1px solid #d0d0d0',
  borderRadius: '0',
  overflow: 'scroll'
}

const pexActivityListItem = {
  padding: '5px 10px',
  backgroundColor: 'rgba(178, 68, 206, .15)',
  borderBottom: '2px solid #615bb1',
  textTransform: 'uppercase',
  textAlign: 'center'
}
