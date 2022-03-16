import { AppContextType } from "../types/types";
import { rowColToIndex, mapNumberRange } from "../utils/utils";

export function drawNumberToCell(
  value: number,
  row: number,
  col: number,
  numberCells: HTMLDivElement[][],
  color: string
) {
  if (value === null) return;
  const index = rowColToIndex(row, col);
  const div = numberCells[index][value - 1];
  div.style.color = `rgb(${color})`;
  div.style.opacity = "1";
}

export function iluminateCell(
  row: number,
  col: number,
  colorCells: HTMLDivElement[]
) {
  const index = rowColToIndex(row, col);
  const div = colorCells[index];
  div.style.opacity = "1";
}
