import {
  Refs,
  Board,
  CAC,
  AppContextType,
  MouseContextType,
  CellBloomRefs,
} from "../types/types";
import { indexToRowCol, mapNumberRange } from "./utils";
import { drawNumberToCell } from "./drawToCells";
import { mouseHover, showTextOnHover } from "./mouseHover";

export function refreshCells(
  colorRefs: Refs,
  numberRefs: Refs,
  cellBloomRefs: CellBloomRefs,
  originalBoard: Board,
  currentBoard: Board,
  context: AppContextType,
  mouse: MouseContextType
): void {
  const colors = colorRefs.current;
  const numbers = numberRefs.current;
  if (colors && numbers) {
    for (let i = 0; i < colors.length; i += 1) {
      let [canvas, ctx] = colors[i];
      fadeOutColor(canvas, ctx, context);
      mouseHover(canvas, ctx, mouse);
      fadeOutBloom(i, cellBloomRefs, context);
      [canvas, ctx] = numbers[i];
      fadeOutCanvas(canvas, ctx, context);
      showTextOnHover(canvas, ctx, mouse, context.selectedNumber);
      drawPlacedNumbers(numbers, originalBoard, currentBoard, i, context);
    }
  }
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
  // if (pixelData[0] >= 250 || pixelData[1] >= 250 || pixelData[2] >= 250)
  //   ctx.fillStyle = "white";
  // if (pixelData[0] <= r + 5 || pixelData[1] <= g + 5 || pixelData[2] <= b + 5)
  //   ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  if (pixelData[1] <= g + 5) ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function fadeOutCanvas(
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
  if (originalBoard[row][col])
    drawNumberToCell(value, row, col, refs, "54, 224, 173", context);
  else drawNumberToCell(value, row, col, refs, "255, 255, 255", context);
}

function fadeOutBloom(
  index: number,
  cellBloomRefs: CellBloomRefs,
  context: AppContextType
) {
  const colorFadeSpeed = mapNumberRange(
    context.colorFadeSpeed,
    0,
    0.92,
    1,
    0.1
  );
  const current = cellBloomRefs.current;
  const cell = current[index];
  const currentOpacity = +cell.style.opacity;
  cell.style.opacity = currentOpacity - colorFadeSpeed + "";
}
