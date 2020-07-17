import React, { Component } from "react";

// import Score from "./Score";

export default class Board extends Component {

  render() {
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


        <div className="square sq-32">32</div>
      </div>
    )
  }
}