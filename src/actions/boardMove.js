import {
  getBoard,
  getBoardMap,
  getEmptyBoardMap,
  getBoardDimensions,
} from "../selectors";
import { compareCondition } from "../utils/board";
import { updateBoardMap, updateQueues } from "./board";
import { updateScore } from "./game";

// --VERTICALLY--
export function moveBoardVertically(
  borderIndex,
  direction,
  shouldUpdate = true
) {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const { rows, columns } = getBoardDimensions(getState());
    const newBoardMap = getEmptyBoardMap(rows, columns);
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];
    let roundScore = 0;

    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      // For each element of column in passed direction skips empty items and creates a move helper array.
      let moveItemsArr = [];
      for (
        let rowIndex = borderIndex;
        compareCondition(rowIndex, direction);
        rowIndex += direction
      ) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          const square = boardMap[rowIndex][columnIndex];
          moveItemsArr.push({ ...square });
        }
      }

      // Builds moving, mergech and updated queues.
      for (let i = 0; i < moveItemsArr.length; i++) {
        const newItem = moveItemsArr[i];
        const newItemNeighbour = moveItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions.
        if (
          newItemNeighbour &&
          moveItemsArr[i].value === moveItemsArr[i + 1].value
        ) {
          // Updates merged item.
          newItemNeighbour.posX = Math.abs(borderIndex - i);
          newItemNeighbour.posY = columnIndex;
          newItemNeighbour.merge = true;
          roundScore = roundScore + newItemNeighbour.value * 2;

          // Adds merged item to moving and merged queue.
          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          // Adds item that the 'merged' item merged to to update queue.
          updatedQue.push(newItem);

          // Removes merged item from helper array to make sure that the following items are moving correctly.
          moveItemsArr.splice(i, 1);

          // TODO ?
          // Removes merged item from boardMap.
          // newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;
        }

        // Updates newItem to it's new position
        newItem.posX = Math.abs(borderIndex - i);
        newItem.posY = columnIndex;

        // Checks if a new item has different position that the previous item, if so the new item
        // is added to moving queue.
        const previousItem = boardMap[Math.abs(borderIndex - i)][columnIndex];
        if (previousItem === null || newItem.id !== previousItem.id) {
          moveQue.push(newItem);
        }

        // Updates boardMap
        newBoardMap[Math.abs(borderIndex - i)][columnIndex] = newItem;
      }
    }

    // Can run without modifying boardMap to check if there is any possible move left.
    if (shouldUpdate) {
      dispatch(updateBoardMap(newBoardMap));
      dispatch(updateScore(roundScore));
    }

    dispatch(updateQueues(moveQue, merchedQue, updatedQue));
  };
}

export function moveBoardHorizontally(
  borderIndex,
  direction,
  shouldUpdate = true
) {
  return (dispatch, getState) => {
    const boardMap = getBoardMap(getState());
    const { rows, columns } = getBoardDimensions(getState());
    const newBoardMap = getEmptyBoardMap(rows, columns);
    const moveQue = [];
    const merchedQue = [];
    const updatedQue = [];
    let roundScore = 0;

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      // For each element of row in passed direction skips empty items and creates a move helper array.
      const moveItemsArr = [];
      for (
        let columnIndex = borderIndex;
        compareCondition(columnIndex, direction);
        columnIndex += direction
      ) {
        // Skips empty items and creates move array.
        if (boardMap[rowIndex][columnIndex]) {
          const square = boardMap[rowIndex][columnIndex];
          moveItemsArr.push({ ...square });
        }
      }

      // Builds moving, mergech and updated queues.
      for (let i = 0; i < moveItemsArr.length; i++) {
        const newItem = moveItemsArr[i];
        const newItemNeighbour = moveItemsArr[i + 1];

        // Merges two items if they have same values at consecutive positions.
        if (
          newItemNeighbour &&
          moveItemsArr[i].value === moveItemsArr[i + 1].value
        ) {
          // Updates merged item.
          newItemNeighbour.posX = rowIndex;
          newItemNeighbour.posY = Math.abs(borderIndex - i);
          newItemNeighbour.merge = true;
          roundScore = roundScore + newItemNeighbour.value * 2;

          // Adds merged item to moving and merged queue.
          moveQue.push(newItemNeighbour);
          merchedQue.push(newItemNeighbour);
          // Adds item that the 'merged' item merged to to update queue.
          updatedQue.push(newItem);

          // Removes merged item from helper array to make sure that the following items are moving correctly.
          moveItemsArr.splice(i, 1);

          // TODO ?
          // Removes merged item from boardMap.
          // newBoardMap[newItemNeighbour.posX][newItemNeighbour.posY] = null;
        }

        // Updates newItem to it's new position
        newItem.posX = rowIndex;
        newItem.posY = Math.abs(borderIndex - i);

        // Checks if a new item has different position that the previous item, if so the new item
        // is added to moving queue.
        const previousItem = boardMap[rowIndex][Math.abs(borderIndex - i)];
        if (previousItem === null || newItem.id !== previousItem.id) {
          moveQue.push(newItem);
        }

        // Updates boardMap
        newBoardMap[rowIndex][Math.abs(borderIndex - i)] = newItem;
      }
    }

    // Can run without modifying boardMap to check if there is any possible move left.
    if (shouldUpdate) {
      dispatch(updateBoardMap(newBoardMap));
      dispatch(updateScore(roundScore));
    }

    dispatch(updateQueues(moveQue, merchedQue, updatedQue));
  };
}
