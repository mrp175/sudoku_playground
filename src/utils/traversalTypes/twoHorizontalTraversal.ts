import { Board } from "../../types/types";

export function convertToTwoHorizontalIndexes(
  matrix: Board
): [number, number][] {
  const result: [number, number][] = [];
  let count = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      result.push([j, i]);
      result.push([matrix.length - 1 - j, matrix[0].length - 1 - i]);
      count += 1;
      if (count === 41) break;
    }
    if (count === 41) break;
  }
  return result;
}
