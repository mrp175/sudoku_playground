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
};
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
