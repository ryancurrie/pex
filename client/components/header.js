import React from 'react'

const Header = () => {
  return (
    <div className="row" style={styles}>
      <div className="col-xs-12 col-sm-4 offset-sm-4 text-center">
        <p style={logoStyle}>PEX</p>
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
  fontSize: '3em',
  fontWeight: '100',
  textIndent: '15px',
  letterSpacing: '15px',
  color: 'hsla(0, 0%, 100%, .45)'
}
