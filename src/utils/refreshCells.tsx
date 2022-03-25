import {
  Board,
  CAC,
  AppContextType,
  BoardContextType,
  MouseContextType,
  UserSelectedCells,
} from "../types/types";
import { deepCopyBoard, indexToRowCol, mapNumberRange, timeout } from "./utils";
import {
  animateBoardChange,
  drawNumberToCell,
  drawPendingAnimations,
} from "./drawToCells";
import { handleMouseHover, highlightCellOnHover } from "./mouseHover";
import { secondary_color } from "../styleVars/styleVars";

export async function refreshCells(
  boardContext: BoardContextType,
  appContext: AppContextType,
  mouseContext: MouseContextType
) {
  const pendingAnimations = await getPendingAnimations(boardContext);
  function refresh() {
    refreshAllCells(boardContext, appContext, mouseContext);
    if (appContext.mouseHoverIndex !== null)
      highlightCellOnHover(boardContext, appContext);
    animateBoardChange(boardContext, appContext);
    drawPendingAnimations(boardContext, appContext, pendingAnimations);
  }
  window.requestAnimationFrame(refresh);
  refreshCells(boardContext, appContext, mouseContext);
}

function fadeOutColor(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  context: AppContextType
) {
  const pixelData = ctx.getImageData(0, 0, 1, 1).data;
  let { colorFadeSpeed, isRunning } = context;
  if (!isRunning) colorFadeSpeed = 0.87;
  const r = 16;
  const g = 32;
  const b = 39;
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${1 - colorFadeSpeed})`;
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
  let { isRunning, textFadeSpeed } = context;
  if (!isRunning) textFadeSpeed = 40;
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
  selectedCells: UserSelectedCells,
  index: number,
  context: AppContextType
) {
  const [row, col] = indexToRowCol(index);
  const value = currentBoard[row][col] as number;
  if (index !== context.mouseHoverIndex) {
    if (selectedCells[index])
      drawNumberToCell(
        selectedCells[index],
        row,
        col,
        refs,
        secondary_color,
        context
      );
    else if (originalBoard[row][col])
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
  await timeout(1000 / 60);
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
  const {
    originalBoard,
    board,
    colorCells,
    bloomCells,
    numberCells,
    selectedCells,
  } = boardContext;
  let hoveringOverCell = false;
  for (let i = 0; i < colorCells.length; i += 1) {
    let [canvas, ctx] = colorCells[i];
    fadeOutColor(canvas, ctx, appContext);
    fadeOutBloom(i, bloomCells, appContext);
    if (handleMouseHover(canvas, mouseContext, appContext, i) === true)
      hoveringOverCell = true;
    [canvas, ctx] = numberCells[i];
    fadeOutNumbers(canvas, ctx, appContext);
    drawPlacedNumbers(
      numberCells,
      originalBoard,
      board,
      selectedCells,
      i,
      appContext
    );
  }
  if (!hoveringOverCell) appContext.mouseHoverIndex = null;
}
