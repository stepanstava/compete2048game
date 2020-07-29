import React, { Component } from "react";
import { connect } from 'react-redux'

import Toolbar from "./Toolbar";
import Board from "./Board";

import {
 
  isWinningState,
  isLosingState,
 
} from "../../selectors";

class Game extends Component {
  // constructor(props) {
  //   super(props);

  
  renderWinningScreen() {
    const { handleNewGameButton } = this.props;

    return (
      <div className="winning-screen">
        <h2>You win!</h2>
        <div className="buttons">
          <button
            className="btn"
            onClick={() => this.props.setKeepPlayingMode()}
          >
            Keep playing
          </button>
          <button className="btn" onClick={() => this.props.gameInit(true)}>
            Try again
          </button>
        </div>
      </div>
    );
  }



  render() {
    const {isWinning} = this.props;

    return (
      <div className="content">
        <Toolbar />
        <Board />
        {isWinning ? this.renderWinningScreen() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state", state)
  return {
    isWinning: isWinningState(state)
  }
};

export default connect(
  mapStateToProps,
  null
)(Game)

// export default Game;
