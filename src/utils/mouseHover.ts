import {
  AppContextType,
  BoardContextType,
  MouseContextType,
  MousePosition,
} from "../types/types";
import {
  colorCanvas,
  colorCell,
  drawNumberToCell,
  drawNumberToCellAltInputs,
} from "./drawToCells";
import { indexToRowCol } from "./utils";

export function handleMouseHover(
  canvas: HTMLCanvasElement,
  mouse: MouseContextType,
  appContext: AppContextType,
  index: number
) {
  const boundingRect = canvas.getBoundingClientRect();
  const { left, top, bottom, right } = boundingRect;
  const { x, y } = mouse.position;
  if (x !== null && y !== null) {
    if (x >= left && x <= right && y >= top && y <= bottom) {
      appContext.mouseHoverIndex = index;
      return true;
    }
  }
}

export function showTextOnHover(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  mouse: MousePosition,
  value: number
) {
  const boundingRect = canvas.getBoundingClientRect();
  const { left, top, bottom, right } = boundingRect;
  const { x, y } = mouse.position;
  if (x >= left && x <= right && y >= top && y <= bottom) {
    drawNumberToCellAltInputs(canvas, ctx, value, "255, 255, 255");
  }
}

export function highlightCellOnHover(
  boardContext: BoardContextType,
  appContext: AppContextType
) {
  const { colorCells, bloomCells, numberCells } = boardContext;
  const { selectedNumber, mouseHoverIndex } = appContext;
  if (mouseHoverIndex !== null) {
    const [row, col] = indexToRowCol(mouseHoverIndex);
    colorCell(row, col, colorCells, bloomCells, appContext);
    drawNumberToCell(
      selectedNumber,
      row,
      col,
      numberCells,
      "255, 255, 255",
      appContext
    );
  }
}
