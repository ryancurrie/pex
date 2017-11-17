import React from 'react'
import Img from 'react-image'

const Logo = () => {
  return (
    <div>
      <Img style={styles} src="/assets/pexLogo.png" />
    </div>
  )
}

module.exports = Logo

const styles = {
  maxWidth: '9em'
}
