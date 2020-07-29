import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import actions from "../../actions";

import Square from "./Square";

import { getSquares, getBoardDimensions, getGameMode } from "../../selectors";

class Board extends Component {
  componentDidMount() {
    this.props.gameInit();
  }

  getSquareSize() {
    const { squareSize } = this.props;

    return {
      width: squareSize + "px",
      height: squareSize + "px",
    };
  }

  renderSquares() {
    const { squares, gameMode, squareSize } = this.props;
    const { rows, columns } = this.props.boardDimensions;
    const larger = Math.max(rows, columns);

    return squares.map(square => {
      if (square) {
        const { value, id, posX, posY, merge } = square;

        return (
          <Square
            key={square.id}
            square={square}
            squareSize={squareSize}
            style={this.getSquareSize()}
            gameMode={gameMode}
          />
        );
      }
    });
  }

  // Tiles are used only as css placeholders for squares.
  renderTile(row, column) {
    return <div className="tile" key={`${row}:${column}`}></div>;
  }

  // TODO move to componentDidMount ?

  // grid-template-columns: repeat(4, 1fr);
  // grid-template-rows: repeat(4, 1fr);

  getTilesStyle() {
    const { rows, columns } = this.props.boardDimensions;

    const styles = {
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    };

    return styles;
  }

  renderTiles() {
    const { rows, columns } = this.props.boardDimensions;
    const tiles = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        tiles.push(this.renderTile(rowIndex, columnIndex));
      }
    }
    return tiles;
  }

  render() {
    const { squares, isWinning, isLosing, isSettingsOpen } = this.props;

    return (
      <Fragment>
        <div className="tile-container" style={this.getTilesStyle()}>
          {this.renderTiles()}
        </div>
        <div className="square-container">{this.renderSquares()}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  squares: getSquares(state),
  boardDimensions: getBoardDimensions(state),
  gameMode: getGameMode(state),
});

export default connect(mapStateToProps, {
  moveBoard: actions.moveBoard,
  addSquare: actions.addSquare,
  gameInit: actions.gameInit,
})(Board);
