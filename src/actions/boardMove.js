import { getBoard, getBoardMap, getEmptyBoardMap } from "../selectors";
import { compareCondition } from "../utils/board";

const SQUARES_ROW = 4;
const MERGE_DELAY = 500;

// --VERTICALLY--
export function moveBoardVertically(borderIndex, direction) {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
      let moveItemsArr = [];

      // For each element of column from bottom to top.
      for (
        let rowIndex = borderIndex;
        compareCondition(rowIndex, direction);
        rowIndex += direction
      ) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          moveItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < moveItemsArr.length; i++) {
        const newItem = moveItemsArr[i];
        const newItemNeighbour = moveItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          moveItemsArr[i].value === moveItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = Math.abs(borderIndex - i);
          newItemNeighbour.posY = columnIndex;
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          moveItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = Math.abs(borderIndex - i);
        newItem.posY = columnIndex;

        const mapItem = boardMap[Math.abs(borderIndex - i)][columnIndex];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posX !== mapItem.posX) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[Math.abs(borderIndex - i)][columnIndex] = newItem;
      }
    }

    clearQueues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
  };
}

//-- HORIZONTALLY --
export function moveBoardHorizontally(borderIndex, direction) {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const newBoardMap = getEmptyBoardMap(getState());
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];

    for (let rowIndex = 0; rowIndex < SQUARES_ROW; rowIndex++) {
      let moveItemsArr = [];

      // For each element of column from bottom to top.
      for (
        let columnIndex = borderIndex;
        compareCondition(columnIndex, direction);
        columnIndex += direction
      ) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          moveItemsArr.push(boardMap[rowIndex][columnIndex]);
        }
      }

      // Build moving, mergech and updated queues.
      for (let i = 0; i < moveItemsArr.length; i++) {
        const newItem = moveItemsArr[i];
        const newItemNeighbour = moveItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions
        if (
          newItemNeighbour &&
          moveItemsArr[i].value === moveItemsArr[i + 1].value
        ) {
          // updates boardMap
          newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;

          // updates merged item
          newItemNeighbour.posX = rowIndex;
          newItemNeighbour.posY = Math.abs(borderIndex - i);
          newItemNeighbour.merge = true;

          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          updatedQue.push(newItem);

          //removes merged item from helper array to make sure that the following items are moving correctly
          moveItemsArr.splice(i, 1);
        }

        // updates newItem to it's new position
        newItem.posX = rowIndex;
        newItem.posY = Math.abs(borderIndex - i);

        const mapItem = boardMap[rowIndex][Math.abs(borderIndex - i)];
        // has changed position - moving only in row direction
        if (mapItem === null || newItem.posY !== mapItem.posY) {
          moveQue.push(newItem);
        }

        // updates boardMap
        newBoardMap[rowIndex][Math.abs(borderIndex - i)] = newItem;
      }
    }

    clearQueues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap);

    // finally we can update boardMap
    dispatch({
      type: "UPDATE_BOARD_MAP",
      boardMap: newBoardMap,
    });
  };
}

function clearQueues(dispatch, moveQue, merchedQue, updatedQue, newBoardMap) {
  // clears moving que
  moveQue.forEach(square => {
    dispatch({
      type: "UPDATE_SQUARE",
      square,
    });
  });

  setTimeout(() => {
    // removes merged item from the dom after merge animation
    merchedQue.forEach(square => {
      dispatch({
        type: "REMOVE_SQUARE",
        square,
      });
    });

    // updates value of items that 'was merged' and updated the boardMap
    updatedQue.forEach(square => {
      const { posX, posY } = square;
      square.value *= 2;
      newBoardMap[posX][posY] = square;

      dispatch({
        type: "UPDATE_SQUARE",
        square,
      });
    });
  }, MERGE_DELAY);
}
