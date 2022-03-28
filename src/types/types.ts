import { JsxAttributeLike, NumberLiteralType } from "typescript";

export type CAC = [HTMLCanvasElement, CanvasRenderingContext2D];
export type Refs = React.MutableRefObject<CAC[]>;
export type Board = (number | null)[][];
export type BoardRef = React.MutableRefObject<Board>;
export type CanvasArr = [HTMLCanvasElement, CanvasRenderingContext2D][];
export type AppContextType = {
  isRunning: boolean;
  reset: string;
  illuminateCells: boolean;
  colorFadeSpeed: number;
  textFadeSpeed: number;
  speed: number;
  fadeRefreshRate: number;
  selectedNumber: number;
  traversalDirection: TraversalDirections;
  mouseHoverIndex: number | null;
  userSelectionExists: boolean;
  hasRun: boolean;
  shouldRunAnimations: boolean;
  isMenuOpen: boolean;
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
  position: { x: number | null; y: number | null };
  positionOnMouseDown: { x: number | null; y: number | null };
  mouseDown: boolean;
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
  e: MouseEvent,
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

export type BloomCellsRef = React.MutableRefObject<HTMLDivElement[]>;
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
export type UseRefMutable<T> = React.MutableRefObject<T>;
export type UseRef<T> = React.RefObject<T>;
export type CellColorsRef = React.MutableRefObject<
  [HTMLCanvasElement, CanvasRenderingContext2D][]
>;
export type CellNumbersRef = CellColorsRef;
export type CanvasAndCtxTuple = [HTMLCanvasElement, CanvasRenderingContext2D];
export type CellBloom = HTMLDivElement;
export type BoardContextType = {
  originalBoard: Board;
  board: Board;
  colorCells: CanvasAndCtxTuple[];
  bloomCells: CellBloom[];
  bloomCellsAltColor: CellBloom[];
  numberCells: CanvasAndCtxTuple[];
  selectedCells: UserSelectedCells;
  boardChangeAnimation: [number, number][];
  mouseClickAnimations: [number, number][];
  resetAnimations: [number, number][];
};
export type UserSelectedCells = { [index: string]: number };
export type MousePosition = { position: { x: number; y: number } };
export type ResetStateContextType = {
  hasRun: StateSetState<boolean> | null;
  userSelectionExists: StateSetState<boolean> | null;
};
export type Presets = {
  [key: string]: JSX.Element | JSX.Element[];
};
export type PresetsRef = {
  [key: string]: HTMLCanvasElement[];
};
export type Difficulty = "custom" | "easy" | "medium" | "hard" | "expert";
export type ScreenDimensionsContextType = {
  width: number;
  height: number;
};
