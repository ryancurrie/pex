import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Welcome extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 offset-sm-3 text-center">
        <div className="row">
          <div className="col" style={styles.column}>
            <h3>{`Welcome ${localStorage.getItem('username')}`}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col" style={styles.column}>
            <h6>How Pex Works</h6>
          </div>
        </div>
        <div className="row">
          <div className="col" style={styles.column}>
            Pex is a real time sweepstakes game, where users can bid Pex for a
            chance to win a jackpot.
          </div>
        </div>
        <div className="row">
          <div className="col" style={styles.column}>
            Once you enter a lobby you will be placed into a round. Each round
            is 90 seconds long. At the end of the round a winner is awarded the
            jackpot.
          </div>
        </div>
        <div className="row">
          <div className="col" style={styles.column}>
            The jackpot consists of all bids entered in the current round. Your
            chances to win are proportional to the amount of Pex you bid during
            the round.
          </div>
        </div>
        <div className="row">
          <div className="col" style={styles.column}>
            Good luck, have fun!
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="w-50">
            <Link to={{ pathname: '/lobbies' }}>
              <button className="pex-button">Let's Go</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  column: {
    marginBottom: '1.5em'
  }
}
