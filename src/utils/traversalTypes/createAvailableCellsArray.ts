import {
  Board,
  BoardContextType,
  TraversalDirections,
} from "../../types/types";
import { convertToVerticalIndexes } from "./verticalTraversal";
import { convertToHorizontalIndexes } from "./horizontalTraversal";
import { convertToSpiralIndexes } from "./spiralTraversal";
import { convertToTwoVerticalIndexes } from "./twoVerticalTraversal";
import { convertToTwoHorizontalIndexes } from "./twoHorizontalTraversal";
import { convertToRandomIndexes } from "./randomTraversal";

function createIndexPositions(
  board: Board,
  createIndexesFunc: (board: (number | null)[][]) => [number, number][],
  goForwards: boolean
): [number, number][] {
  const traversalIndexes = createIndexesFunc(board);
  const result: [number, number][] = [];
  for (let xy of traversalIndexes) {
    const [row, col] = xy;
    if (board[row][col] === null) result.push([row, col]);
  }
  if (!goForwards) return result.reverse();
  return result;
}

export function createAvailableIndexes(
  boardContext: BoardContextType,
  traversalType: TraversalDirections
) {
  const { board } = boardContext;
  let result: [number, number][] = [];
  if (traversalType === "down")
    result = createIndexPositions(board, convertToVerticalIndexes, true);
  if (traversalType === "right")
    result = createIndexPositions(board, convertToHorizontalIndexes, true);
  if (traversalType === "up")
    result = createIndexPositions(board, convertToVerticalIndexes, false);
  if (traversalType === "left")
    result = createIndexPositions(board, convertToHorizontalIndexes, false);
  if (traversalType === "spiral")
    result = createIndexPositions(board, convertToSpiralIndexes, true);
  if (traversalType === "spiralReverse")
    result = createIndexPositions(board, convertToSpiralIndexes, false);
  if (traversalType === "twoVertical")
    result = createIndexPositions(board, convertToTwoVerticalIndexes, true);
  if (traversalType === "twoHorizontal")
    result = createIndexPositions(board, convertToTwoHorizontalIndexes, true);
  if (traversalType === "random")
    result = createIndexPositions(board, convertToRandomIndexes, true);
  return result;
}
