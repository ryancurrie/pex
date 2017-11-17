import React from 'react'

function underTenSeconds(time) {
  if (typeof time !== 'string') {
    return
  }
  const breakup = time.split(':')
  const minutes = breakup[0]
  const seconds = breakup[1]
  return minutes === '00' && parseInt(seconds) <= 10
}

function styleThing(time) {
  return underTenSeconds(time) ? { color: '#FE1461' } : {}
}

const TimeLeft = props => {
  underTenSeconds(props.time)
  return (
    <div>
      <div className="text-muted">Time left</div>
      <h1 style={styleThing(props.time)}>{props.time || '--:--'}</h1>
    </div>
  )
}

module.exports = TimeLeft
