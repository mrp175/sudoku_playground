import { Board } from "../../types/types";

export function convertToHorizontalIndexes(matrix: Board): [number, number][] {
  const result: [number, number][] = [];
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      result.push([j, i]);
    }
  }
  return result;
}
