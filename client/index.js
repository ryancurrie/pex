import React from 'react'
import ReactDom from 'react-dom'
import App from './app.js'
import { HashRouter } from 'react-router-dom'

ReactDom.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.querySelector('#root')
)
