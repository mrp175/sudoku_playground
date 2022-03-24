import {
  primary_color,
  background_alt_color,
  primary_color_alpha,
} from "../styleVars/styleVars";
import { Presets, SetState, UseRefMutable, PresetsRef } from "../types/types";
import { indexToRowCol } from "./utils";
import {
  CanvasContainer,
  Canvas,
} from "../components/BoardSelectionMenu/Selection/Selection.styled";

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
    ctx.font = "bold 30px Arial";
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

export function createCanvasElements(
  puzzleStrings: string[],
  difficulty: string,
  setPresets: SetState<Presets>,
  presetsRef: PresetsRef
) {
  const canvasElements: JSX.Element[] = [];
  const currentRefs: HTMLCanvasElement[] = [];
  for (let i = 0; i < puzzleStrings.length; i += 1) {
    const canvas = (
      <CanvasContainer>
        <Canvas key={"C" + i} ref={(el) => currentRefs.push(el!)} />
      </CanvasContainer>
    );
    canvasElements.push(canvas);
  }
  setPresets((state) => {
    const newState = { ...state };
    newState[difficulty] = canvasElements;
    return newState;
  });
  presetsRef[difficulty] = currentRefs;
}