// import { cloneDeep } from "lodash";
// const initialState = {
//   roundScore: 0,
//   queues: {
//     moveQue: [],
//     merchedQue: [],
//     updatedQue: [],
//   },
// };

// export default function (state = initialState, action) {
//   switch (action.type) {
//     case "CLEAR_BOARD_MAP": {
//       const { rows, columns } = state.boardDimensions;

//       return {
//         ...state,
//         board: getEmptyBoardMap(rows, columns),
//       };
//     }

//     case "UPDATE_BOARD_MAP": {
//       const { boardMap } = action;

//       return {
//         ...state,
//         boardMap,
//       };
//     }

//     case "UPDATE_QUEUES": {
//       const { moveQue, merchedQue, updatedQue } = action.queues;
//       return {
//         ...state,
//         queues: {
//           moveQue,
//           merchedQue,
//           updatedQue,
//         },
//       };
//     }

//     case "CLEAR_QUEUES": {
//       return {
//         ...state,
//         queues: {
//           moveQue: [],
//           merchedQue: [],
//           updatedQue: [],
//         },
//       };
//     }

//     default:
//       return state;
//   }
// }

// // -- Selectors
// // export function getBoardMap(state) {
// //   return state.board.boardMap;
// }