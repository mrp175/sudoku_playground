import { AppContextType, CanvasArr, BoardContextType } from "../types/types";
import {
  mapRangeWithBias,
  RowColToIndex,
  mapNumberRange,
} from "../utils/utils";
import { primary_color } from "../styleVars/styleVars";

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
  ctx.font = "bold 30pt Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
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
  ctx.fillStyle = `rgb(${primary_color})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

export function colorCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.beginPath();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}

export function drawPendingAnimations(
  boardContext: BoardContextType,
  appContext: AppContextType,
  pendingAnimations: [number, number, number | null][]
) {
  const { colorCells, bloomCells } = boardContext;
  for (let i = 0; i < pendingAnimations.length; i += 1) {
    const [row, col, value] = pendingAnimations[i];
    if (value !== null) {
      console.log("coloring cell");
      colorCell(row, col, colorCells, bloomCells, appContext);
    }
  }
}
