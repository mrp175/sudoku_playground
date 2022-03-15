import { Board } from "../../types/types";

export function convertToSpiralIndexes(matrix: Board): [number, number][] {
  const arrLength = matrix.length * matrix[0].length;
  const result: number[][] = [];
  let leftPointer = 0;
  let rightPointer = matrix[0].length - 1;
  let topPointer = 0;
  let bottomPointer = matrix.length - 1;
  while (true) {
    result.push(
      ...traverseForwards(leftPointer, rightPointer, topPointer, "right")
    );
    if (result.length === arrLength) break;
    topPointer += 1;
    result.push(
      ...traverseForwards(topPointer, bottomPointer, rightPointer, "down")
    );
    if (result.length === arrLength) break;
    rightPointer -= 1;
    result.push(
      ...traverseBackwards(rightPointer, leftPointer, bottomPointer, "left")
    );
    if (result.length === arrLength) break;
    bottomPointer -= 1;
    result.push(
      ...traverseBackwards(bottomPointer, topPointer, leftPointer, "up")
    );
    leftPointer += 1;
    if (result.length === arrLength) break;
  }
  return result as [number, number][];
}

function traverseForwards(
  start: number,
  end: number,
  rowOrColIndex: number,
  direction: string
) {
  const result = [];
  for (let i = start; i <= end; i += 1) {
    if (direction === "down") result.push([i, rowOrColIndex]);
    if (direction === "right") result.push([rowOrColIndex, i]);
  }
  return result;
}

function traverseBackwards(
  start: number,
  end: number,
  rowOrColIndex: number,
  direction: string
) {
  const result = [];
  for (let i = start; i >= end; i -= 1) {
    if (direction === "up") result.push([i, rowOrColIndex]);
    if (direction === "left") result.push([rowOrColIndex, i]);
  }
  return result;
}
