import React, { Component } from "react";
import { connect } from "react-redux";

import { getGameScore, getGameRoundScore, getBestScore } from "../../selectors";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  componentDidMount() {
    document.body.removeEventListener("keydown", this.props.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.addEventListener("keydown", this.props.handleKeyDown);
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="game-result">
        <span>Submit your result:</span>
        <form>
          <div className="label">
            <label>Name</label>
            <input
              type="text"
              onChange={e => this.handleInputChange(e)}
              value={this.state.value}
            />
          </div>
        </form>
        {/* ! Submit name */}
        <button className="btn">Submit</button>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   score: getGameScore(state),
//   bestScore: getBestScore(state),
//   roundScore: getGameRoundScore(state),
// });

export default connect(null)(Result);
