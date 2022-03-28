import React from "react";
import {
  AppContextType,
  MouseContextType,
  StateSetState,
  BoardContextType,
  ResetStateContextType,
  ScreenDimensionsContextType,
} from "../../types/types";

export const defaultRunningState = false;
export const IsRunningContext =
  React.createContext<StateSetState<boolean> | null>(null);

// function PositionContextProvider({ children }) {
//   return <EditModeContext.Provder value={false}>{children}</EditModeContext.Provder>;
// }

export const resetState: ResetStateContextType = {
  hasRun: null,
  userSelectionExists: null,
};
export const ResetStateContext =
  React.createContext<ResetStateContextType | null>(null);

export const appContext: AppContextType = {
  isRunning: defaultRunningState,
  reset: "complete",
  speed: 152.36,
  illuminateCells: true,
  colorFadeSpeed: 0.757,
  textFadeSpeed: 44.947,
  fadeRefreshRate: 60,
  selectedNumber: 1,
  traversalDirection: "down",
  mouseHoverIndex: null,
  userSelectionExists: false,
  hasRun: false,
  shouldRunAnimations: false,
  isMenuOpen: false,
};
export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

export const mouseContext: MouseContextType = {
  position: {
    x: null,
    y: null,
  },
  positionOnMouseDown: {
    x: null,
    y: null,
  },
  mouseDown: false,
};
export const MouseContext =
  React.createContext<React.MutableRefObject<MouseContextType> | null>(null);

export const boardContext: BoardContextType = {
  originalBoard: [],
  board: [],
  colorCells: [],
  bloomCells: [],
  bloomCellsAltColor: [],
  numberCells: [],
  selectedCells: {},
  boardChangeAnimation: [],
  mouseClickAnimations: [],
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

export const ScreenDimensionsContext =
  React.createContext<ScreenDimensionsContextType | null>(null);
