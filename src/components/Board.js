import React, { Component } from "react";
import { connect } from "react-redux";

import Square from "./Square";

// import Score from "./Score";
import {getBoard} from "../selectors";

class Board extends Component {
  renderBoard(board) {
    return board.map((row, indexX) => {
      return row.map((square, indexY) => {
        if (square) {
          const {value, id} = square;
          return (
            <Square key={id} value={value} indexX={indexX} indexY= {indexY}/>
          )
        }
        return null;
      })
    })
  }


  render() {
    const { board } = this.props;

    return (
      <div className="board">
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>
        <div className="tile"></div>

        {this.renderBoard(board)}

        
      </div>
    )
  }
}

const mapStateToProps = state => ({
  board: getBoard(state),
});

export default connect(mapStateToProps)(Board);