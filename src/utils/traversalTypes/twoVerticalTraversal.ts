import { Board } from "../../types/types";

export function convertToTwoVerticalIndexes(matrix: Board): [number, number][] {
  const result: [number, number][] = [];
  let count = 0;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      result.push([i, j]);
      result.push([matrix.length - 1 - i, matrix[0].length - 1 - j]);
      count += 1;
      if (count === 41) break;
    }
    if (count === 41) break;
  }
  return result;
}
