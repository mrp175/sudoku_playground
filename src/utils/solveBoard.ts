import { drawNumberToCell, colorCell } from "./drawToCells";
import { deepCopyBoard } from "./utils";

type Board = (number | null)[][];

export async function solveBoard(
  board: Board,
  setBoard: React.Dispatch<React.SetStateAction<(number | null)[][]>>,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  textRefs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  isRunningRef: React.MutableRefObject<boolean>
): Promise<Board | false> {
  if (isRunningRef.current === false) return board;
  await timeout(1000 / 60);

  const nextCell = findNextCell(board);
  if (!nextCell) return board;
  const [row, col] = nextCell;

  for (let i = 1; i <= 9; i += 1) {
    if (placeDigit(i, row, col, board, setBoard, refs, textRefs)) {
      const current = await solveBoard(
        board,
        setBoard,
        refs,
        textRefs,
        isRunningRef
      );
      if (current) return board;
    }
  }

  board[row][col] = null;
  setBoard((b) => {
    const newB = deepCopyBoard(board);
    newB[row][col] = null;
    return newB;
  });

  return false;
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function findNextCell(board: Board) {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (board[i][j] === null) return [i, j];
    }
  }
  return false;
}

function placeDigit(
  value: number,
  row: number,
  col: number,
  board: Board,
  setBoard: React.Dispatch<React.SetStateAction<(number | null)[][]>>,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  textRefs: [HTMLCanvasElement, CanvasRenderingContext2D][]
) {
  setBoard((b) => {
    const newB = deepCopyBoard(board);
    newB[row][col] = value;
    return newB;
  });
  board[row][col] = value;
  if (isCellValid(row, col, board)) {
    colorCell(value, row, col, refs);
    drawNumberToCell(value, row, col, textRefs, "white");
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
