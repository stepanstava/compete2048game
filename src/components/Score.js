import React, { Component } from "react";

// import Score from "./Score";

export default class Score extends Component {

  render() {
    return (
      <div className="score">
        <span className="title">Score</span>
        <span className="points">80</span>
      </div>
    )
  }
}