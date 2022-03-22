import {
  Board,
  CAC,
  AppContextType,
  BoardContextType,
  MouseContextType,
} from "../types/types";
import { deepCopyBoard, indexToRowCol, mapNumberRange, timeout } from "./utils";
import { drawNumberToCell, drawPendingAnimations } from "./drawToCells";
import { handleMouseHover, highlightCellOnHover } from "./mouseHover";
import { mouseContext } from "../components/Providers/appContexts";

export async function refreshCells(
  boardContext: BoardContextType,
  appContext: AppContextType,
  mouseContext: MouseContextType
) {
  const pendingAnimations = await getPendingAnimations(boardContext);
  refreshAllCells(boardContext, appContext, mouseContext);
  if (appContext.mouseHoverIndex !== null)
    highlightCellOnHover(boardContext, appContext);
  drawPendingAnimations(boardContext, appContext, pendingAnimations);
  refreshCells(boardContext, appContext, mouseContext);
}

function fadeOutColor(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  context: AppContextType
) {
  const pixelData = ctx.getImageData(0, 0, 1, 1).data;
  const tailLength = context.colorFadeSpeed;
  const r = 16;
  const g = 32;
  const b = 39;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1 - tailLength})`;
  if (pixelData[1] <= g + 6) ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function fadeOutNumbers(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  context: AppContextType
) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const values = imageData.data;
  const textFadeSpeed = context.textFadeSpeed;
  for (let i = 3; i < values.length; i += 4) {
    values[i] -= textFadeSpeed;
    if (values[i] < 0) values[i] = 0;
  }
  ctx.putImageData(imageData, 0, 0);
}

function drawPlacedNumbers(
  refs: CAC[],
  originalBoard: Board,
  currentBoard: Board,
  index: number,
  context: AppContextType
) {
  const [row, col] = indexToRowCol(index);
  const value = currentBoard[row][col] as number;
  if (index !== context.mouseHoverIndex) {
    if (originalBoard[row][col])
      drawNumberToCell(value, row, col, refs, "54, 224, 173", context);
    else drawNumberToCell(value, row, col, refs, "255, 255, 255", context);
  }
}

function fadeOutBloom(
  index: number,
  bloomCells: HTMLDivElement[],
  context: AppContextType
) {
  const colorFadeSpeed = mapNumberRange(
    context.colorFadeSpeed,
    0,
    0.92,
    1,
    0.1
  );
  const cell = bloomCells[index];
  const currentOpacity = +cell.style.opacity;
  cell.style.opacity = currentOpacity - colorFadeSpeed + "";
}

async function getPendingAnimations(boardContext: BoardContextType) {
  const { board } = boardContext;
  const startingBoard = deepCopyBoard(board);
  const pendingAnimations: [number, number, number | null][] = [];
  await timeout(100 / 60);
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (startingBoard[i][j] !== board[i][j]) {
        pendingAnimations.push([i, j, board[i][j]]);
      }
    }
  }
  return pendingAnimations;
}

function refreshAllCells(
  boardContext: BoardContextType,
  appContext: AppContextType,
  mouseContext: MouseContextType
) {
  const { originalBoard, board, colorCells, bloomCells, numberCells } =
    boardContext;
  let hoveringOverCell = false;
  for (let i = 0; i < colorCells.length; i += 1) {
    let [canvas, ctx] = colorCells[i];
    fadeOutColor(canvas, ctx, appContext);
    fadeOutBloom(i, bloomCells, appContext);
    if (handleMouseHover(canvas, mouseContext, appContext, i) === true)
      hoveringOverCell = true;
    [canvas, ctx] = numberCells[i];
    fadeOutNumbers(canvas, ctx, appContext);
    drawPlacedNumbers(numberCells, originalBoard, board, i, appContext);
  }
  if (!hoveringOverCell) appContext.mouseHoverIndex = null;
}
