import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import Score from "./Score";

class Toolbar extends Component {
  // constructor(props) {
  //   super(props);

  // }

  renderScore() {
    return (
      <div className="scores">
        <Score />

        <div className="score">
          <span className="title">Best</span>
          <span className="points">35880</span>
        </div>
      </div>
    );
  }

  // TODO new game button nefunguje dobre
  render() {
    return (
      <div className="toolbar">
        <div className="row">
          <button className="btn" onClick={() => this.props.gameInit()}>
            New Game
          </button>
          {/* <div class="timer">01:05:23</div> */}
          <i className="fas fa-cog settings"></i>
        </div>

        <div className="row">
          {this.renderScore()}

          <div className="history">
            <button className="btn" onClick={() => this.props.undo()}>
              <i className="fas fa-undo"></i>
            </button>
            <button className="btn">
              <i className="fas fa-redo"></i>
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

export default connect(null, {
  gameInit: actions.gameInit,
  undo: actions.undo,
})(Toolbar);
