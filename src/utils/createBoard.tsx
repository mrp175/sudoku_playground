import { BoardContextType } from "../types/types";
import { Cell, Canvas, BloomBoxShadow } from "../components/Board/Board.styled";

export function createSubGrid(boardContext: BoardContextType) {
  const result = [];
  const { board, colorCells, numberCells, bloomCells } = boardContext;

  for (let i = 0; i < 9 * 9; i += 1) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    let val: number | null | string = board[row][col];
    if (val === null) val = "";
    result.push(
      <Cell key={`${row},${col}`}>
        <BloomBoxShadow
          ref={(el) => {
            bloomCells.push(el!);
          }}
        />
        <Canvas
          id={`C${i}`}
          ref={(el) => {
            colorCells.push([el!, el?.getContext("2d")!]);
          }}
        />
        <Canvas
          ref={(el) => {
            numberCells.push([el!, el?.getContext("2d")!]);
          }}
        />
      </Cell>
    );
  }
  return result;
}
