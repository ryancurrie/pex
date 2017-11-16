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
  fontWeight: '900',
  letterSpacing: '5px',
  fontSize: '46px',
  color: '#007bff',
  border: '6px solid #007bff',
  padding: '0px 20px',
  backgroundColor: '#f3f3f3'
}
