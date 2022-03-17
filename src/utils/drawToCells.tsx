import {
  AppContextType,
  CanvasArr,
  CellColorsRef,
  CellNumbersRef,
  BloomCellsRef,
  Board,
} from "../types/types";
import {
  mapRangeWithBias,
  RowColToIndex,
  mapNumberRange,
  deepCopyBoard,
  indexToRowCol,
} from "../utils/utils";
import { primary_color } from "../styleVars/styleVars";
import {
  fadeOutColor,
  fadeOutCanvas,
  fadeOutBloom,
  drawPlacedNumbers,
} from "./refreshCells";
import { timeout } from "./solveBoard";

export function drawNumberToCell(
  value: number,
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  color: string,
  context: AppContextType
) {
  if (value === null) return;
  const [canvas, ctx] = getCanvasAndContext(refs, row, col);
  ctx.beginPath();
  ctx.fillStyle = `rgb(${color})`;
  ctx.textAlign = "center";
  ctx.font = "bold 30pt Courier";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // let shadowBlurOpacity = mapRangeWithBias(
  //   context.textFadeSpeed,
  //   255,
  //   10,
  //   1,
  //   0.5,
  //   0.4,
  //   "log"
  // );
  // ctx.shadowColor = `rgba(${color}, ${shadowBlurOpacity})`;
  ctx.shadowColor = `rgba(${color})`;
  let shadowBlurAmount = mapRangeWithBias(
    context.textFadeSpeed,
    255,
    10,
    3,
    1,
    0.6,
    "log"
  );
  ctx.shadowBlur = shadowBlurAmount;
  ctx.fillText(value + "", canvas.width / 2, canvas.height / 2 + 2);
  ctx.closePath();
}

export function drawNumberToCellAltInputs(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  value: number,
  color: String
) {
  ctx.beginPath();
  ctx.fillStyle = `rgb(${color})`;
  ctx.textAlign = "center";
  ctx.font = "bold 30pt Courier";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.shadowColor = `rgba(${color})`;
  let shadowBlurAmount = 2;
  ctx.shadowBlur = shadowBlurAmount;
  ctx.fillText(value + "", canvas.width / 2, canvas.height / 2 + 2);
  ctx.closePath();
}

function getCanvasAndContext(refs: CanvasArr, row: number, col: number) {
  const index = row * 9 + col;
  return refs[index];
}

export function createColors() {
  const result = [];
  let increment = Math.floor(150 / 9);
  let hue = 220;
  for (let i = 0; i <= 9; i += 1) {
    result.push(`hsl(${hue}, 100%, 83%)`);
    hue += increment;
  }
  return result;
}

const color = "rgb(60, 224, 175)";

export function colorCell(
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][],
  cellBloomRefs: HTMLDivElement[],
  appContext: AppContextType
) {
  const bloomAmount =
    Math.floor(mapNumberRange(appContext.colorFadeSpeed, 0, 0.92, 0, 1) * 100) /
    100;
  const index = RowColToIndex(row, col);
  cellBloomRefs[index].style.opacity = bloomAmount + "";
  const [canvas, ctx] = getCanvasAndContext(refs, row, col);
  ctx.beginPath();
  // ctx.fillStyle = colors[value - 1];
  ctx.fillStyle = `rgb(${primary_color})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

export function colorCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

export async function getPendingAnimations(
  boardRef: React.MutableRefObject<Board>,
  originalBoard: Board,
  cellColorRefs: CellColorsRef,
  bloomCellsRef: BloomCellsRef,
  cellNumberRefs: CellNumbersRef,
  appContext: AppContextType
) {
  const board = boardRef.current;
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
  const colors = cellColorRefs.current;
  const numbers = cellNumberRefs.current;
  if (colors) {
    for (let i = 0; i < colors.length; i += 1) {
      let [canvas, ctx] = colors[i];
      fadeOutColor(canvas, ctx, appContext);
      // mouseHover(canvas, ctx, mouse);
      fadeOutBloom(i, bloomCellsRef, appContext);
      [canvas, ctx] = numbers[i];
      fadeOutCanvas(canvas, ctx, appContext);
      const [row, col] = indexToRowCol(i);
      const value = board[row][col] as number;
      // showTextOnHover(canvas, ctx, mouse, context.selectedNumber);
      drawPlacedNumbers(numbers, originalBoard, board, i, appContext);
      // if (numbers[i] !== null)
      //   drawNumberToCellAltInputs(canvas, ctx, value, `rgb(255, 255, 255)`);
    }
  }
  drawPendingAnimations(
    cellColorRefs,
    cellNumberRefs,
    bloomCellsRef,
    pendingAnimations,
    appContext
  );
  getPendingAnimations(
    boardRef,
    originalBoard,
    cellColorRefs,
    bloomCellsRef,
    cellNumberRefs,
    appContext
  );
}

function drawPendingAnimations(
  cellColorsRef: CellColorsRef,
  cellNumbersRef: CellNumbersRef,
  bloomCellsRef: BloomCellsRef,
  pendingAnimations: [number, number, number | null][],
  appContext: AppContextType
) {
  const colorCells = cellColorsRef.current;
  const numberCells = cellNumbersRef.current;
  const bloomCells = bloomCellsRef.current;
  for (let i = 0; i < pendingAnimations.length; i += 1) {
    const [row, col, value] = pendingAnimations[i];
    if (value !== null) {
      colorCell(row, col, cellColorsRef.current, bloomCells, appContext);
    }
  }
}
