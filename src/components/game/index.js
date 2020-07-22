import React, { Component } from "react";
// import { connect } from 'react-redux'

import Toolbar from "./Toolbar";
import Board from "./Board";

class Game extends Component {
  // constructor(props) {
  //   super(props);

  // }



  render() { 
    return (
      <div className="content">
        <Toolbar />
        <Board />
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

export default Game;
