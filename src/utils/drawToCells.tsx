import { CanvasArr } from "../types/types";

export function drawNumberToCell(
  value: number,
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][]
) {
  if (value === null) return;
  const [canvas, ctx] = getCanvasAndContext(refs, row, col);
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "bold 30pt Courier";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(value + "", canvas.width / 2, canvas.height / 2 + 2);
  ctx.closePath();
}

function getCanvasAndContext(refs: CanvasArr, row: number, col: number) {
  const index = row * 9 + col;
  return refs[index];
}

export function createColors() {
  const result = [];
  let increment = 360 / 9;
  let hue = 0;
  for (let i = 0; i <= 9; i += 1) {
    result.push(`hsl(${hue}, 40%, 75%)`);
    hue += increment;
  }
  return result;
}

const colors = createColors();

export function colorCell(
  value: number,
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][]
) {
  const [canvas, ctx] = getCanvasAndContext(refs, row, col);
  ctx.beginPath();
  ctx.fillStyle = colors[value - 1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}
