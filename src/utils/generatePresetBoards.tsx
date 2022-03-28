import { primary_color, primary_color_alpha } from "../styleVars/styleVars";
import {
  Presets,
  SetState,
  PresetsRef,
  AppContextType,
  BoardContextType,
  Difficulty,
} from "../types/types";
import { indexToRowCol } from "./utils";
import {
  CanvasContainer,
  Canvas,
  PresetText,
} from "../components/BoardSelectionMenu/Selection/Selection.styled";
import RippleEffect from "../components/BoardSelectionMenu/Selection/RippleEffect/RippleEffect";
import { changeBoard, changeBoardFromString } from "./changeBoard";

export function createPresetBoard(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  height: number,
  numbers: [number, number][]
) {
  canvas.height = height;
  canvas.width = height;
  const cellHeight = height / 9;
  ctx.strokeStyle = `rgba(${primary_color}, ${primary_color_alpha})`;
  ctx.beginPath();
  for (let i = cellHeight; i < height; i += cellHeight) {
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
    ctx.font = `bold ${Math.floor(height / 13)}px Arial`;
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

export function convertPuzzleStringToObject(str: string) {
  const result: { [key: string]: number } = {};
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] !== "0") result[`${i}`] = +str[i];
  }
  return result;
}

export function createCanvasElements(
  puzzleStrings: string[],
  difficulty: Difficulty,
  setPresets: SetState<Presets>,
  presetsRef: PresetsRef,
  setIsOpen: SetState<boolean>,
  appContext: AppContextType,
  boardContext: BoardContextType,
  gridWidth: number
) {
  const canvasElements: JSX.Element[] = [];
  const currentRefs: HTMLCanvasElement[] = [];
  for (let i = 0; i < puzzleStrings.length; i += 1) {
    const canvas = (
      <CanvasContainer
        key={"C" + i}
        onClick={() =>
          onClick(setIsOpen, appContext, boardContext, i, difficulty)
        }
        theme={{ gridWidth }}
      >
        <Canvas key={"C" + i} ref={(el) => currentRefs.push(el!)} />
        <RippleEffect />
        {/* <PresetText>{i}</PresetText> */}
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

function onClick(
  setIsOpen: SetState<boolean>,
  appContext: AppContextType,
  boardContext: BoardContextType,
  index: number,
  difficulty: Difficulty
) {
  setTimeout(function () {
    setIsOpen(false);
  }, 150);
  setTimeout(function () {
    changeBoard(boardContext, index, difficulty);
  }, 900);
}

export function createFromPuzzleString(
  setIsOpen: SetState<boolean>,
  boardContext: BoardContextType,
  puzzleString: string
) {
  setTimeout(function () {
    setIsOpen(false);
  }, 150);
  setTimeout(function () {
    changeBoardFromString(boardContext, puzzleString);
  }, 900);
}
