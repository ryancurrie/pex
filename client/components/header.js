import React from 'react'

const Header = () => {
  return (
    <div className="row" style={styles}>
      <div className="col text-center">
        <span className="navbar-brand">PEX</span>
      </div>
    </div>
  )
}

module.exports = Header

const styles = {
  marginTop: '1em',
  marginBottom: '1.5em'
}
