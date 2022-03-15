import { drawNumberToCell, colorCell } from "./drawToCells";
import { AppContextType } from "../types/types";
import { deepCopyBoard } from "./utils";

type Board = (number | null)[][];

export async function solveBoard(
  board: Board,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  textRefs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  cellBloomRefs: HTMLDivElement[],
  context: AppContextType,
  availableCellsArray: [number, number][],
  index = 0
): Promise<Board | false> {
  if (context.isRunning === false) {
    return board;
  }
  await timeout(1000 / context.speed);

  if (index === availableCellsArray.length) {
    console.log(board);
    return board;
  }
  const [row, col] = availableCellsArray[index];

  for (let i = 1; i <= 9; i += 1) {
    if (
      placeDigit(i, row, col, board, refs, textRefs, cellBloomRefs, context)
    ) {
      const current = await solveBoard(
        board,
        refs,
        textRefs,
        cellBloomRefs,
        context,
        availableCellsArray,
        index + 1
      );
      if (current) return board;
    }
  }

  // await timeout(1000 / context.speed);
  // colorCell(row, col, refs);
  board[row][col] = null;
  return false;
}

// function createRandomStack (board: Board) {
//   const newBoard: (number | null)[][] = deepCopyBoard(board);
//   const result = [];
//   for (let i = 0; i < 81; i += 1) {
//     const random = Math.floor(Math.random() * board.length);

//   }
// }

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// function findNextCell(board: Board, goForwards: boolean) {
//   if (goForwards) {
//     for (let i = 0; i < 9; i += 1) {
//       for (let j = 0; j < 9; j += 1) {
//         if (board[i][j] === null) return [i, j];
//       }
//     }
//   } else {
//     for (let i = 8; i >= 0; i -= 1) {
//       for (let j = 8; j >= 0; j -= 1) {
//         if (board[i][j] === null) return [i, j];
//       }
//     }
//   }
//   return false;
// }

function placeDigit(
  value: number,
  row: number,
  col: number,
  board: Board,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  textRefs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  cellBloomRefs: HTMLDivElement[],
  context: AppContextType
) {
  board[row][col] = value;
  if (isCellValid(row, col, board)) {
    if (context.illuminateCells)
      colorCell(row, col, refs, cellBloomRefs, context);
    drawNumberToCell(value, row, col, textRefs, "255, 255, 255", context);
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
