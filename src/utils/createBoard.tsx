import { CellBloomRefs, Refs } from "../types/types";
import { Cell, Canvas, BloomBoxShadow } from "../components/Board/Board.styled";

export function createSubGrid(
  cellColorRefs: Refs,
  cellNumberRefs: Refs,
  cellBloomRefs: CellBloomRefs,
  board: (number | null)[][]
) {
  const result = [];
  const colors = cellColorRefs.current;
  const numbers = cellNumberRefs.current;
  const bloom = cellBloomRefs.current;
  for (let i = 0; i < 9 * 9; i += 1) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    let val: number | null | string = board[row][col];
    if (val === null) val = "";
    result.push(
      <Cell key={`${row},${col}`}>
        <BloomBoxShadow
          ref={(el) => {
            bloom.push(el!);
          }}
        />
        <Canvas
          ref={(el) => {
            colors.push([el!, el?.getContext("2d")!]);
          }}
        />
        <Canvas
          ref={(el) => {
            numbers.push([el!, el?.getContext("2d")!]);
          }}
        />
      </Cell>
    );
  }
  return result;
}
