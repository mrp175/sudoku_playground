import { Board, BoardPresetsRefType } from "../types/types";

export function setBoardPresets(boards: Board[], presets: BoardPresetsRefType) {
  if ("current" in presets) {
    const current = presets.current;
    for (let board of boards) {
      current?.push(board);
    }
  }
}

export function createBoardFromString(puzzleStr: string) {
  const result: number[][] = [];
  let row: number[] = [];
  for (let digit of puzzleStr) {
    row.push(+digit);
    if (row.length === 9) {
      result.push(row);
      row = [];
    }
  }
  return result;
}

//they're called puzzle strings
