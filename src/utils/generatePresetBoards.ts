import {
  primary_color,
  background_alt_color,
  primary_color_alpha,
} from "../styleVars/styleVars";
import { indexToRowCol } from "./utils";

export function createPresetBoard(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  height: number,
  numbers: [number, number][]
) {
  canvas.height = height;
  canvas.width = height;
  ctx.fillStyle = `rgb(${background_alt_color})`;
  ctx.fillRect(0, 0, height, height);
  const cellHeight = height / 9;
  ctx.strokeStyle = `rgba(${primary_color}, ${primary_color_alpha})`;
  ctx.beginPath();
  for (let i = 0; i < height; i += cellHeight) {
    const pos = Math.floor(i);
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, height);
    ctx.moveTo(0, pos);
    ctx.lineTo(height, pos);
  }
  ctx.stroke();
  for (let item of numbers) {
    const [index, value] = item;
    const [row, col] = indexToRowCol(index);
    const xPos = col * cellHeight + cellHeight / 2;
    const yPos = row * cellHeight + cellHeight / 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = `rgb(${primary_color})`;
    ctx.fillText(value + "", xPos, yPos);
  }
}

export function convertPuzzleStringToIndexArray(str: string) {
  const result: [number, number][] = [];
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] !== "0") result.push([i, +str[i]]);
  }
  return result;
}
