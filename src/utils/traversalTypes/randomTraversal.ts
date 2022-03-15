import { Board } from "../../types/types";

export function convertToRandomIndexes(matrix: Board): [number, number][] {
  const result: [number, number][] = [];
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      result.push([i, j]);
    }
  }
  shuffle(result);
  return result;
}

function shuffle(array: [number, number][]): [number, number][] {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
