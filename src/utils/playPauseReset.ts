import { AppContextType, BoardContextType, SetState } from "../types/types";
import { createAvailableIndexes } from "./traversalTypes/createAvailableCellsArray";
import { solveBoard } from "./solveBoard";
import { deepCopyBoard, indexToRowCol } from "./utils";

export function playPause(
  boardContext: BoardContextType,
  appContext: AppContextType,
  setHasRun: SetState<boolean>,
  setIsRunning: SetState<boolean>
) {
  if (!appContext.isRunning) {
    appContext.isRunning = true;
    appContext.hasRun = true;
    setIsRunning(true);
    setHasRun(true);
    const availableCellIndexes = createAvailableIndexes(
      boardContext,
      appContext.traversalDirection
    );
    solveBoard(boardContext, appContext, availableCellIndexes, setIsRunning);
  } else {
    appContext.isRunning = false;
    setIsRunning(false);
  }
}

export function resetBoard(
  boardContext: BoardContextType,
  appContext: AppContextType,
  setHasRun: SetState<boolean>
) {
  const board = deepCopyBoard(boardContext.originalBoard);
  const selectedCells = boardContext.selectedCells;
  for (let index in selectedCells) {
    if (selectedCells.hasOwnProperty(index)) {
      const [row, col] = indexToRowCol(+index);
      board[row][col] = selectedCells[index];
    }
  }
  boardContext.board = board;
  appContext.hasRun = false;
  setHasRun(false);
}

export function clearUserInput(
  boardContext: BoardContextType,
  appContext: AppContextType,
  setUserSelectionExists: SetState<boolean>
) {
  boardContext.board = deepCopyBoard(boardContext.originalBoard);
  boardContext.selectedCells = {};
  appContext.userSelectionExists = false;
  setUserSelectionExists(false);
}

// function resetBoard() {

// }

// function resetAll() {

// }

// function resetBoard() {
//   const boardContext = boardContextRef?.current!;
//   let board = boardContext.board;
//   board = deepCopyBoard(boardPresetsContextRef![1]);
//   const selectedCells = boardContext.selectedCells;
//   for (let i = 0; i < board.length; i += 1) {
//     if (i + "" in selectedCells) {
//       const [row, col] = indexToRowCol(i);
//       board[row][col] = selectedCells[i + ""];
//     }
//   }
//   const appContext = appContextRef?.current!;
//   if (hasRun) {
//     setHasRun(false);
//   } else if (userSelectionExists) {
//     boardContext.selectedCells = {};
//     appContext.userSelectionExists = false;
//     setUserSelectionExists(false);
//   }
// }

// function playPause() {
//   if (appContextRef && appContextRef.current) {
//     if (appContextRef.current.isRunning === false) {
//       appContextRef.current.isRunning = true;
//       const availableCellIndexes = createAvailableIndexes(
//         boardContextRef?.current!,
//         appContextRef.current.traversalDirection
//       );
//       appContextRef.current.hasRun = true;
//       setIsRunning(true);
//       setHasRun(true);
//       solveBoard(
//         boardContextRef?.current!,
//         appContextRef.current,
//         availableCellIndexes,
//         setIsRunning
//       );
//     } else {
//       appContextRef.current.isRunning = false;
//       setIsRunning(false);
//     }
//   }
// }
