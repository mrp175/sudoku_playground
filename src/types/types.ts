import { NumberLiteralType } from "typescript";

export type CAC = [HTMLCanvasElement, CanvasRenderingContext2D];
export type Refs = React.MutableRefObject<CAC[]>;
export type Board = (number | null)[][];
export type BoardRef = React.MutableRefObject<Board>;
export type CanvasArr = [HTMLCanvasElement, CanvasRenderingContext2D][];
export type AppContextType = {
  isRunning: boolean;
  illuminateCells: boolean;
  colorFadeSpeed: number;
  textFadeSpeed: number;
  speed: number;
  fadeRefreshRate: number;
  selectedNumber: number;
  traversalDirection: TraversalDirections;
};

export type TraversalDirections =
  | "down"
  | "left"
  | "up"
  | "right"
  | "spiral"
  | "spiralReverse"
  | "twoHorizontal"
  | "twoVertical"
  | "random";

export type TraversalTextFields =
  | "down"
  | "right"
  | "up"
  | "left"
  | "spiral"
  | "reverse spiral"
  | "two horizontal"
  | "two vertical"
  | "random";

export type MouseContextType = {
  position: { x: number; y: number };
};

export type DialType = {
  min: number;
  max: number;
  step: number;
  init: number;
  log: number;
  logType: "exp" | "log";
  dbType: "db" | "linear";
  waveformId: string;
};

export interface MouseState {
  isDown: boolean;
  x: {
    start: number;
    end: number;
    distanceTravelled: number;
  };
  y: {
    start: number;
    end: number;
    distanceTravelled: number;
  };
}

export type HandleMouseInput = (
  e: MouseEvent | TouchEvent,
  parentRef?: HTMLDivElement | undefined,
  callback?:
    | ((
        mouse: MouseState,
        parentRef?: HTMLDivElement | undefined,
        state?: number
      ) => void)
    | undefined
) => void;

export interface NewMouseState {
  mouse: MouseState;
  handleDown: HandleMouseInput;
  handleMove: HandleMouseInput;
  handleUp: HandleMouseInput;
}

export type AppContextPropNames =
  | "colorFadeSpeed"
  | "textFadeSpeed"
  | "speed"
  | "fadeRefreshRate";

export type BoardPresetsRefType = React.MutableRefObject<Board[] | null>;

export type CellBloomRefs = React.MutableRefObject<HTMLDivElement[]>;
export type SetTouchState = React.Dispatch<
  React.SetStateAction<{
    disatnceTravelled: number;
  }>
>;
export type TouchState = {
  disatnceTravelled: number;
};

export type StateSetState<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
