import { drawNumberToCell, colorCell } from "./drawToCells";
import { AppContextType, BoardContextType, SetState } from "../types/types";
import { deepCopyBoard, timeout } from "./utils";

type Board = (number | null)[][];

let count = 0;

export async function solveBoard(
  boardContext: BoardContextType,
  appContext: AppContextType,
  availableCellsArray: [number, number][],
  setIsRunning: SetState<boolean>,
  index = 0
): Promise<Board | false> {
  const { board } = boardContext;
  if (appContext.isRunning === false) return board;

  if (appContext.speed <= 120) {
    count = 0;
    await timeout(1000 / appContext.speed);
  } else {
    if (count >= appContext.speed / 120) {
      await timeout(1000 / 120);
      count = 0;
    }
    count += 1;
  }

  if (index === availableCellsArray.length) {
    setIsRunning(false);
    appContext.isRunning = false;
    return board;
  }
  const [row, col] = availableCellsArray[index];

  for (let i = 1; i <= 9; i += 1) {
    if (placeDigit(i, row, col, board)) {
      const current = await solveBoard(
        boardContext,
        appContext,
        availableCellsArray,
        setIsRunning,
        index + 1
      );
      if (current) return board;
    }
  }
  board[row][col] = null;
  return false;
}

function placeDigit(value: number, row: number, col: number, board: Board) {
  board[row][col] = value;
  if (isCellValid(row, col, board)) {
    return true;
  }
  return false;
}

export function isCellValid(row: number, col: number, board: Board) {
  if (!checkRowOrCol(row, col, board, "horizontal")) return false;
  if (!checkRowOrCol(row, col, board, "vertical")) return false;
  if (!checkSubgrid(row, col, board)) return false;
  return true;
}

function checkSubgrid(row: number, col: number, board: Board) {
  const values = new Set();
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i += 1) {
    for (let j = startCol; j < startCol + 3; j += 1) {
      const currentVal = board[i][j];
      if (currentVal !== null) {
        if (!values.has(currentVal)) values.add(currentVal);
        else return false;
      }
    }
  }
  return true;
}

function checkRowOrCol(
  row: number,
  col: number,
  board: Board,
  direction: string
) {
  const values = new Set();
  for (let i = 0; i < 9; i += 1) {
    let currentVal;
    if (direction === "horizontal") currentVal = board[row][i];
    if (direction === "vertical") currentVal = board[i][col];
    if (currentVal !== null) {
      if (!values.has(currentVal)) values.add(currentVal);
      else return false;
    }
  }
  return true;
}
