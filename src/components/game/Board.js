import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import Square from "./Square";


import {
  getSquares,
  shouldBoardMove,
  isWinningState,
  isLosingState,
  isSettingsOpen,
  getBoardDimensions,
  getGameMode
} from "../../selectors";

class Board extends Component {
  componentDidMount() {
    // document.body.addEventListener('keydown', (e) => this.handleKeyDown(e))
    this.props.gameInit();
  }

  getSquareSize() {
    const { squareSize } = this.props;
   

    return {
      "width": squareSize + 'px',
      "height": squareSize + 'px',
    }

  }


  


  renderSquares() {
    const { squares, gameMode, squareSize } = this.props;
    const { rows, columns} = this.props.boardDimensions;
    const larger = Math.max(rows, columns);
    //!same as nahore
    const styles = {
      "width": squareSize + 'px',
      "height": squareSize + 'px',
    }


    return squares.map(square => {
      if (square) {
        const { value, id, posX, posY, merge } = square;

        // TODO pass down the whole square object
        return (
          <Square
            key={square.id}
            square={square}
            squareSize={squareSize}
            style={styles}
            gameMode={gameMode}
          />
        );
      }
    });
  }



  //!style mozna neni potreba
  renderTile(row, column) {
    return <div className="tile" key={`${row}:${column}`} ></div>;
  }

  // Tiles are used only as css placeholders for squares.
  // TODO move to componentDidMount ?

  // grid-template-columns: repeat(4, 1fr);
  // grid-template-rows: repeat(4, 1fr);

  


  getTilesStyle() {
    const {rows, columns} = this.props.boardDimensions;

    const styles = {
      "gridTemplateRows": `repeat(${rows}, 1fr)`,
      "gridTemplateColumns": `repeat(${columns}, 1fr)`,
    }

    return styles;
  }




  renderTiles() {
    const {rows, columns} = this.props.boardDimensions;
    const tiles = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        tiles.push(this.renderTile(rowIndex, columnIndex));
      }
    }
    return tiles;
  }

  // renderWinningScreen() {
  //   const { handleNewGameButton } = this.props;

  //   return (
  //     <div className="winning-screen">
  //       <h2>You win!</h2>
  //       <div className="buttons">
  //         <button
  //           className="btn"
  //           onClick={() => this.props.setKeepPlayingMode()}
  //         >
  //           Keep playing
  //         </button>
  //         <button className="btn" onClick={() => this.props.gameInit(true)}>
  //           Try again
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // TODO add losing screen


  render() {
    const { squares, isWinning, isLosing, isSettingsOpen } = this.props;

    return (
      <Fragment>
        <div className="tile-container" style={this.getTilesStyle()}>{this.renderTiles()}</div>
        <div className="square-container">{this.renderSquares()}</div>
        {/* {isWinning ? this.renderWinningScreen() : null} */}
       
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  squares: getSquares(state),
  // shouldBoardMove: shouldBoardMove(state),
  // isWinning: isWinningState(state),
  // isLosing: isLosingState(state),
  // isSettingsOpen: isSettingsOpen(state),
  boardDimensions: getBoardDimensions(state),
  gameMode: getGameMode(state),
});

export default connect(mapStateToProps, {
  moveBoard: actions.moveBoard,
  addSquare: actions.addSquare,
  gameInit: actions.gameInit,
 
})(Board);
