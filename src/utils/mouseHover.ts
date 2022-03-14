import { MouseContextType } from "../types/types";
import { colorCanvas } from "./drawToCells";

export function mouseHover(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  mouse: MouseContextType
) {
  const boundingRect = canvas.getBoundingClientRect();
  const { left, top, bottom, right } = boundingRect;
  const { x, y } = mouse.position;
  if (x >= left && x <= right && y >= top && y <= bottom) {
    colorCanvas(canvas, ctx);
  }
}
