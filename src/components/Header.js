// !button to own class - shared

import React, { Component } from "react";

// import Score from "./Score";

export default class Header extends Component {

  render() {
    return (
      <div className="header">
        <button className="btn">New Game</button>
      </div>
    )
  }
}