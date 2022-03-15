const b = null;

//puzzle string

export const emptyBoard = [
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
  [b, b, b, b, b, b, b, b, b],
];

const emptyBoardIndexes: [number, number][] = [];

for (let i = 0; i < 9; i += 1) {
  for (let j = 0; j < 9; j += 1) {
    emptyBoardIndexes.push([j, i]);
  }
}

export const hardOne = [
  [8, b, b, b, b, b, b, b, b],
  [b, b, 3, 6, b, b, b, b, b],
  [b, 7, b, b, 9, b, 2, b, b],
  [b, 5, b, b, b, 7, b, b, b],
  [b, b, b, b, 4, 5, 7, b, b],
  [b, b, b, 1, b, b, b, 3, b],
  [b, b, 1, b, b, b, b, 6, 8],
  [b, b, 8, 5, b, b, b, 1, b],
  [b, 9, b, b, b, b, 4, b, b],
];

export const _075 = [
  [b, b, 7, b, 8, 1, b, b, 5],
  [b, b, b, b, b, 3, b, 4, b],
  [b, b, 4, b, b, b, 9, b, 8],
  [5, b, b, b, 4, b, b, 3, b],
  [b, b, b, 8, b, 9, b, b, b],
  [b, 7, b, b, 1, b, b, b, 2],
  [6, b, 3, b, b, b, 7, b, b],
  [b, 4, b, 9, b, b, b, b, b],
  [8, b, b, 1, 7, b, 6, b, b],
];

export const boards = [emptyBoard, hardOne, _075];
export { emptyBoardIndexes };
