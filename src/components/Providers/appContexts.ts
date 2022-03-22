import React from "react";
import {
  AppContextType,
  MouseContextType,
  StateSetState,
  BoardContextType,
} from "../../types/types";

export const defaultRunningState = false;
export const IsRunningContext =
  React.createContext<StateSetState<boolean> | null>(null);

// function PositionContextProvider({ children }) {
//   return <EditModeContext.Provder value={false}>{children}</EditModeContext.Provder>;
// }

export const appContext: AppContextType = {
  isRunning: defaultRunningState,
  speed: 152.36,
  illuminateCells: true,
  colorFadeSpeed: 0.757,
  textFadeSpeed: 44.947,
  fadeRefreshRate: 60,
  selectedNumber: 1,
  traversalDirection: "down",
  mouseHoverIndex: null,
  currentHead: [0, 0],
};
export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

export const mouseContext: MouseContextType = {
  position: { x: null, y: null },
};
export const MouseContext =
  React.createContext<React.MutableRefObject<MouseContextType> | null>(null);

export const boardContext: BoardContextType = {
  originalBoard: [],
  board: [],
  colorCells: [],
  bloomCells: [],
  numberCells: [],
  selectedCells: {},
};
export const BoardContext =
  React.createContext<React.MutableRefObject<BoardContextType> | null>(null);

export const BoardPresetsContext = React.createContext<
  (number | null)[][][] | null
>(null);

export const OrientationContext = React.createContext<string | null>(null);

// export const IsRunningContextProvider = function ({ children }: {children: JSX.Element | JSX.Element[]}) {
//   return <IsRunningContext.Provider value={isRunning}
// }

// export function returnProvider<T>(
//   Context: React.Context<T>,
//   value: T,
//   { children }: { children: JSX.Element | JSX.Element[] }
// ) {
//   return <Context.Provider value={value}>{children}</Context.Provider>;
// }
