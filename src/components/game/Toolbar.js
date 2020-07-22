import React, { Component } from "react";
// import { connect } from 'react-redux'
import Score from "./Score";

class Toolbar extends Component {
  // constructor(props) {
  //   super(props);

  // }

  renderScore() {
    return (
      <div class="scores">
        <Score />

        <div class="score">
          <span class="title">Best</span>
          <span class="points">35880</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="toolbar">
        <div class="row">
          <button class="btn">New Game</button>
          {/* <div class="timer">01:05:23</div> */}
          <i class="fas fa-cog settings"></i>
        </div>

        <div class="row">
          {this.renderScore()}

          <div class="history">
            <button class="btn">
              <i class="fas fa-undo"></i>
            </button>
            <button class="btn">
              <i class="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   console.log("state", state)
//   return {
//     number: state.add.count,
//   }
// };

// export default connect(
//   mapStateToProps,
//   { increment: actions.increment }
// )(App)

export default Toolbar;
