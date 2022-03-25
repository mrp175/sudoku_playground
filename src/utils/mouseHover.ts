import { primary_color, secondary_color } from "../styleVars/styleVars";
import {
  AppContextType,
  BoardContextType,
  MouseContextType,
  MousePosition,
  SetState,
} from "../types/types";
import {
  colorCell,
  drawNumberToCell,
  drawNumberToCellAltInputs,
} from "./drawToCells";
import { indexToRowCol, timeout } from "./utils";
import { createAnimationIndexes } from "./changeBoard";

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
    colorCell(row, col, colorCells, bloomCells, appContext, primary_color, 0.5);
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

export function onMouseUp(
  boardContext: BoardContextType,
  appContext: AppContextType,
  setUserSelectionExists: SetState<boolean>
) {
  console.log("mouse up");
  const { board, selectedCells } = boardContext;
  const { mouseHoverIndex, selectedNumber } = appContext;
  if (mouseHoverIndex !== null) {
    const [row, col] = indexToRowCol(mouseHoverIndex);
    createClickCellIndexes(boardContext, row, col);
    // colorCell(row, col, colorCells, bloomCells, appContext, secondary_color);
    selectedCells[mouseHoverIndex] = selectedNumber;
    appContext.userSelectionExists = true;
    setUserSelectionExists(true);
    board[row][col] = selectedNumber;
  }
}

export async function createClickCellIndexes(
  boardContext: BoardContextType,
  row: number,
  col: number
) {
  const indexes = createAnimationIndexes([row, col], 5);
  indexes.shift();
  // const indexes = createIndexes(row, col);
  indexes.reverse();
  // const indexes: [number, number][][] = [[[row, col]]];
  for (let frame of indexes) {
    boardContext.mouseClickAnimations.push(...frame);
    await timeout(1000 / 60);
  }
  // boardContext.mouseClickAnimations.push(...indexes);
}

function createIndexes(row: number, col: number) {
  const indexes: [number, number][] = [];
  for (let i = 0; i < 9; i += 1) {
    if (i !== col) indexes.push([row, i]);
    if (i !== row) indexes.push([i, col]);
  }
  return indexes;
}
