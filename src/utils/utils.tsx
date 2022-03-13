import { Refs, Board } from "../types/types";

export function handleResize(
  ref: React.RefObject<HTMLDivElement>,
  cellColorRefs: Refs,
  cellNumberRefs: Refs,
  setWidth: React.Dispatch<React.SetStateAction<number>>
) {
  const container = ref.current;
  if (container) {
    let width = container.offsetWidth;
    if (width > 800) width = 800;
    setWidth(width);
    const refs = cellColorRefs.current;
    const textRefs = cellNumberRefs.current;
    if (refs && textRefs) {
      for (let i = 0; i < refs.length; i += 1) {
        resizeCell(refs[i][0], width);
        resizeCell(textRefs[i][0], width);
      }
    }
  }
}

function resizeCell(canvas: HTMLCanvasElement, width: number) {
  canvas.width = width / 9;
  canvas.height = width / 9;
}

export function indexToRowCol(index: number): [number, number] {
  const row = Math.floor(index / 9);
  const col = index % 9;
  return [row, col];
}

export function RowColToIndex(row: number, col: number): number {
  return row * 9 + col;
}

export function deepCopyBoard(board: Board): Board {
  const result: Board = [];
  for (let arr of board) {
    result.push([...arr]);
  }
  return result;
}
