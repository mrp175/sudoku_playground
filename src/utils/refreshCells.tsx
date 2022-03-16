import {
  Refs,
  Board,
  CAC,
  AppContextType,
  MouseContextType,
  CellColorsRef,
  CellNumbersRef,
} from "../types/types";
import { indexToRowCol, mapNumberRange } from "./utils";
import { drawNumberToCell } from "./drawToCells";
import { mouseHover } from "./mouseHover";
import { primary_color } from "../styleVars/styleVars";

export function refreshCells(
  cellColorsRef: CellColorsRef,
  cellNumbersRef: CellNumbersRef,
  originalBoard: Board,
  currentBoard: Board,
  context: AppContextType,
  mouse: MouseContextType
): void {
  const colorCells = cellColorsRef.current;
  const numberCells = cellNumbersRef.current;
  if (cellColorsRef && cellNumbersRef) {
    for (let i = 0; i < colorCells.length; i += 1) {
      const colorDiv = colorCells[i];
      fadeOutCell(colorDiv);
      const oneToNine = numberCells[i];
      for (let j = 0; j < 9; j += 1) {
        const numberDiv = oneToNine[j];
        fadeOutCell(numberDiv);
      }
      mouseHover(colorDiv, oneToNine, context.selectedNumber, mouse);
      drawPlacedNumbers(numberCells, originalBoard, currentBoard, i);
    }
  }
}

function fadeOutCell(div: HTMLDivElement) {
  const newOpacity = +div.style.opacity - 0.1;
  div.style.opacity = newOpacity + "";
}

function drawPlacedNumbers(
  numberCells: HTMLDivElement[][],
  originalBoard: Board,
  currentBoard: Board,
  index: number
) {
  const [row, col] = indexToRowCol(index);
  const value = currentBoard[row][col] as number;
  if (originalBoard[row][col])
    drawNumberToCell(value, row, col, numberCells, primary_color);
  else drawNumberToCell(value, row, col, numberCells, "255, 255, 255");
}

// function fadeOutBloom(
//   index: number,
//   cellBloomRefs: CellBloomRefs,
//   context: AppContextType
// ) {
//   const colorFadeSpeed = mapNumberRange(
//     context.colorFadeSpeed,
//     0,
//     0.92,
//     1,
//     0.1
//   );
//   const current = cellBloomRefs.current;
//   const cell = current[index];
//   const currentOpacity = +cell.style.opacity;
//   cell.style.opacity = currentOpacity - colorFadeSpeed + "";
// }
