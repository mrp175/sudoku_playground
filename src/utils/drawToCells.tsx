import { AppContextType, CanvasArr } from "../types/types";
import { mapRangeWithBias } from "../utils/utils";

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

const colors = createColors();
const color = "rgb(60, 224, 175)";

export function colorCell(
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][]
) {
  const [canvas, ctx] = getCanvasAndContext(refs, row, col);
  ctx.beginPath();
  // ctx.fillStyle = colors[value - 1];
  ctx.fillStyle = color;
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
