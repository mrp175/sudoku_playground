export type CAC = [HTMLCanvasElement, CanvasRenderingContext2D];
export type Refs = React.MutableRefObject<CAC[]>;
export type Board = (number | null)[][];
export type CanvasArr = [HTMLCanvasElement, CanvasRenderingContext2D][];
export type AppContextType = {
  isRunning: boolean;
  illuminateCells: boolean;
  colorFadeSpeed: number;
  textFadeSpeed: number;
  speed: number;
  fadeRefreshRate: number;
};
