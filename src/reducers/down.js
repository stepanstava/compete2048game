
// const SQUARES_ROW = 4;

// export function moveBoardToBottom(state) {
//   console.log("down")

//   const board = state.board;

//   const newBoard = [
//     new Array(4).fill(null),
//     new Array(4).fill(null),
//     new Array(4).fill(null),
//     new Array(4).fill(null),
//   ];

//   for (let columnIndex = 0; columnIndex < SQUARES_ROW; columnIndex++) {
//     let helperArr = [];

//     // for each element of column from bottom to top
//     for (let rowIndex = SQUARES_ROW - 1; rowIndex >= 0; rowIndex--) {
//       // if item has value
//       if (board[rowIndex][columnIndex]) {
//         helperArr.push(board[rowIndex][columnIndex]);
//       }
//     }

//     // for each temporary array 

//     // copying the temporary array to the current column 

//     for (let i = 0; i < helperArr.length; i++) {
//       const item = helperArr[i];
//       item.posX = SQUARES_ROW - 1 - i;
//       item.posY = columnIndex;
//       newBoard[SQUARES_ROW - 1 - i][columnIndex] = item;

//       dispatch({
//         type: "UPDATE_SQUARE",
//         square: item
//       })

//     }
//   }

//   console.log("moveBoardToBottom -> newBoard", newBoard)
//   return newBoard;


// }