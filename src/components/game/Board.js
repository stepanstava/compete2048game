import React, { Component } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import Square from "./Square";
import Settings from "./Settings";

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
  constructor(props) {
    super(props);

    //! Add to store
    this.squareWidth = {
      3: 125,
      4: 100,
      5: 75,
      6: 60
    };
    this.gapWidth = 10;
    this.boardWidth = 450;
  }


  componentDidMount() {
    document.body.addEventListener('keydown', (e) => this.handleKeyDown(e))
    this.props.gameInit();
  }


  getSquareSize() {
    const { rows, columns} = this.props.boardDimensions;
    const larger = Math.max(rows, columns);

    // const squareWidth = (this.boardWidth - (rows + 1) * this.gapWidth) / rows;
    // console.log("Board -> getSquareSize -> squareWidth", squareWidth)
    // const squareHeight = (this.boardWidth - (rows + 1) * this.gapWidth) / rows;


    const styles = {
      "width": this.squareWidth[larger] + 'px',
      "height": this.squareWidth[larger] + 'px',
    }

    return styles;
  }



  renderSquares() {
    const { squares, gameMode } = this.props;
    const { rows, columns} = this.props.boardDimensions;
    const larger = Math.max(rows, columns);

    const styles = {
      "width": this.squareWidth[larger] + 'px',
      "height": this.squareWidth[larger] + 'px',
    }


    return squares.map(square => {
      if (square) {
        const { value, id, posX, posY, merge } = square;

        // TODO pass down the whole square object
        return (
          <Square
            key={square.id}
            square={square}
            squareSize={this.squareWidth[larger]}
            gapWidth={this.gapWidth}
            style={styles}
            gameMode={gameMode}
          />
        );
      }
    });
  }

  handleKeyDown(e) {
    e.preventDefault();
    const { moveBoard, shouldBoardMove } = this.props;

    if (shouldBoardMove) {
      switch (e.key.toUpperCase()) {
        // move right
        case "ARROWRIGHT":
          moveBoard("right");
          break;
        case "D":
          moveBoard("right");
          break;
        // move left
        case "ARROWLEFT":
          moveBoard("left");
          break;
        case "A":
          moveBoard("left");
          break;
        // move top
        case "ARROWUP":
          moveBoard("top");
          break;
        case "W":
          moveBoard("top");
          break;
        // move down
        case "ARROWDOWN":
          moveBoard("bottom");
          break;
        case "S":
          moveBoard("bottom");
          break;
        default:
          return;
      }
    }
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


  getBoardStyles() {
    const {rows, columns} = this.props.boardDimensions;
    // const { rows, columns} = this.props.boardDimensions;
    const larger = Math.max(rows, columns);
    const squareWidth = this.squareWidth[larger];
    const gapWidth = this.gapWidth;

    const boardWidth = rows * squareWidth + 2 * gapWidth + ((rows - 1) * gapWidth)
    const boardHeight = columns * squareWidth + 2 * gapWidth + ((columns - 1) * gapWidth)

    const styles = {
      // "width": boardWidth < boardHeight ? boardWidth + 'px' : boardHeight + 'px',
      // "height": boardWidth < boardHeight ? boardWidth + 'px' : boardHeight + 'px',
      "width": boardHeight + 'px',
      "height": boardWidth + 'px',
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

  // TODO add losing screen
  renderLosingScreen() {
    return (
      <div className="game-over-screen">
        <h2>Game over!</h2>
        <button className="btn" onClick={() => this.props.gameInit(true)}>
          Try again
        </button>
      </div>
    );
  }
  renderSettingsScreen() {
    return (
      <Settings />
    );
  }

  render() {
    const { squares, isWinning, isLosing, isSettingsOpen } = this.props;

    return (
      <div
        className="board"
        style={this.getBoardStyles()}
      >
        <div className="tile-container" style={this.getTilesStyle()}>{this.renderTiles()}</div>
        <div className="square-container">{this.renderSquares()}</div>
        {isWinning ? this.renderWinningScreen() : null}
        {isLosing ? this.renderLosingScreen() : null}
        {isSettingsOpen ? this.renderSettingsScreen() : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  squares: getSquares(state),
  shouldBoardMove: shouldBoardMove(state),
  isWinning: isWinningState(state),
  isLosing: isLosingState(state),
  isSettingsOpen: isSettingsOpen(state),
  boardDimensions: getBoardDimensions(state),
  gameMode: getGameMode(state),
});

export default connect(mapStateToProps, {
  moveBoard: actions.moveBoard,
  addSquare: actions.addSquare,
  gameInit: actions.gameInit,
  setKeepPlayingMode: actions.setKeepPlayingMode,
})(Board);
