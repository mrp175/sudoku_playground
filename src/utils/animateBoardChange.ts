import { primary_color } from "../styleVars/styleVars";
import { BoardContextType, AppContextType, PresetsRef } from "../types/types";
import { colorCell } from "./drawToCells";
import { deepCopyBoard, RowColToIndex, timeout } from "./utils";
import { puzzleStringsObj } from "../puzzleStrings/puzzelStrings";
import { convertPuzzleStringToObject } from "./generatePresetBoards";

type Node = [number, number, number];
type Queue = Node[];
type IndexArrays = { [key: string]: [number, number][] };

export function createAnimationIndexes(startPosition: [number, number]) {
  const queue: Queue = [[...startPosition, 0]];
  const indexes: IndexArrays = { "0": [[...startPosition]] };
  const visited: Set<string> = new Set([]);
  while (queue.length > 0) {
    const [row, col, level] = queue.shift() as Node;
    if (visited.has(`${row},${col}`)) continue;
    visited.add(`${row},${col}`);
    addToResult(row + 1, col, level + 1, indexes, queue);
    addToResult(row - 1, col, level + 1, indexes, queue);
    addToResult(row, col + 1, level + 1, indexes, queue);
    addToResult(row, col - 1, level + 1, indexes, queue);
  }
  const result: [number, number][][] = [];
  for (let level in indexes) {
    if (indexes.hasOwnProperty(level)) {
      result.push(indexes[level]);
    }
  }
  return result;
}

function checkValid(index: [number, number]) {
  if (index[0] < 0) return false;
  if (index[0] > 8) return false;
  if (index[1] < 0) return false;
  if (index[1] > 8) return false;
  return true;
}

function addToResult(
  row: number,
  col: number,
  level: number,
  result: IndexArrays,
  queue: Queue
) {
  if (checkValid([row, col])) {
    queue.push([row, col, level]);
    if (!(level in result)) result[level] = [];
    result[level].push([row, col]);
  }
}

export async function animateBoardChange(
  boardContext: BoardContextType,
  appContext: AppContextType,
  index: number,
  difficulty: "easy" | "medium" | "hard" | "expert"
) {
  const puzzleString = puzzleStringsObj[difficulty][index];
  const puzzleObj = convertPuzzleStringToObject(puzzleString);
  const animationFrames = createAnimationIndexes([4, 4]);
  const { board } = boardContext;
  const { colorCells, bloomCells } = boardContext;
  for (let frame of animationFrames) {
    for (let cell of frame) {
      const [row, col] = cell;
      const i = RowColToIndex(row, col);
      if (puzzleObj[i]) board[row][col] = puzzleObj[i];
      else board[row][col] = null;
      colorCell(row, col, colorCells, bloomCells, appContext, primary_color);
    }
    await timeout(1000 / 60);
  }
  boardContext.originalBoard = deepCopyBoard(board);
}
