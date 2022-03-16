import { CellColorsRef, CellNumbersRef } from "../types/types";
import { Cell, Highlight, Number } from "../components/Board/Board.styled";

export function createSubGrid(
  cellColorRefs: CellColorsRef,
  cellNumberRefs: CellNumbersRef,
  board: (number | null)[][]
) {
  const gridElements = [];
  const colors = cellColorRefs.current;
  const numbers = cellNumberRefs.current;
  for (let i = 0; i < 9 * 9; i += 1) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    let val: number | null | string = board[row][col];
    if (val === null) val = "";
    numbers.push([]);

    const oneToNine: JSX.Element[] = [];
    for (let j = 1; j <= 9; j += 1) {
      numbers.push([]);
      oneToNine.push(
        <Number
          ref={(el) => {
            numbers[i].push(el!);
          }}
        >
          {j}
        </Number>
      );
    }
    gridElements.push(
      <Cell key={`${row},${col}`}>
        <Highlight
          ref={(el) => {
            colors.push(el!);
          }}
        />
        ,{oneToNine}
      </Cell>
    );
  }
  return gridElements;
}
