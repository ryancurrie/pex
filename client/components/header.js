import React from 'react'

const Header = () => {
  return (
    <div className="row" style={styles}>
      <div className="col text-center">
        <span className="navbar-brand" style={logoStyle}>
          PEX
        </span>
      </div>
    </div>
  )
}

module.exports = Header

const styles = {
  marginTop: '1em',
  marginBottom: '1.5em'
}

const logoStyle = {
  fontSize: '2em',
  fontWeight: '100',
  letterSpacing: '15px',
  color: 'hsla(0, 0%, 100%, .45)'
}
