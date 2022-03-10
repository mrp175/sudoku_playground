import { Refs, Board, CAC } from "../types/types";
import { indexToRowCol } from "./utils";
import { drawNumberToCell } from "./drawToCells";

export function refreshCells(
  colorRefs: Refs,
  numberRefs: Refs,
  board: Board
): void {
  const colors = colorRefs.current;
  const numbers = numberRefs.current;
  if (colors && numbers) {
    for (let i = 0; i < colors.length; i += 1) {
      let [canvas, ctx] = colors[i];
      fadeOutColor(canvas, ctx);
      [canvas, ctx] = numbers[i];
      drawPlacedNumbers(numbers, board, i);
      fadeOutNumber(canvas, ctx);
    }
  }
}

function fadeOutColor(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const pixelData = ctx.getImageData(0, 0, 1, 1).data;
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  if (pixelData[0] >= 250 || pixelData[1] >= 250 || pixelData[2] >= 250)
    ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function fadeOutNumber(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const values = imageData.data;
  for (let i = 3; i < values.length; i += 4) {
    values[i] -= 30;
    if (values[i] < 0) values[i] = 0;
  }
  ctx.putImageData(imageData, 0, 0);
}

export function drawPlacedNumbers(refs: CAC[], board: Board, index: number) {
  const [row, col] = indexToRowCol(index);
  const value = board[row][col] as number;
  drawNumberToCell(value, row, col, refs);
}
