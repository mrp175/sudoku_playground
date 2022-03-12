import { MouseContextType } from "../types/types";
import { colorCanvas } from "./drawToCells";

export function mouseHover(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  const rect = canvas.getBoundingClientRect();
  const { left, right, top, bottom } = rect;

  // if (x === 0) console.log("its zero");
  // console.log(left);
  // if (x >= left && x <= right && y <= top && y >= bottom) {
  //   console.log("inside cell");
  // }
}
