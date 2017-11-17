import React from 'react'

const Jackpot = props => {
  return (
    <div>
      <div className="text-muted">Jackpot</div>
      <h1 style={{ color: '#63d679' }}>{props.jackpot}</h1>
    </div>
  )
}

module.exports = Jackpot
