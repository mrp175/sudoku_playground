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
    console.log(new Date().getTime());
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
  loadResetAnimations(boardContext);
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
  loadResetAnimations(boardContext);
  boardContext.board = deepCopyBoard(boardContext.originalBoard);
  boardContext.selectedCells = {};
  appContext.userSelectionExists = false;
  setUserSelectionExists(false);
}

function loadResetAnimations(boardContext: BoardContextType) {
  const { board, originalBoard, resetAnimations } = boardContext;
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (originalBoard[i][j] !== null && board[i][j] !== originalBoard[i][j]) {
        resetAnimations.push([i, j]);
      }
    }
  }
}
