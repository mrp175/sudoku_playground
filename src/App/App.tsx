import React, { useRef } from "react";
import Grid from "../Board/Board";
import Controls from "../Controls/Visuals/Visuals";
import { AppContextType, MouseContextType } from "../types/types";
import { ComponentWrapper } from "./App.styled";
import PlayPause from "../Controls/PlayPause/PlayPause";
import TitleBar from "../TopBar/TitleBar";

export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

const context = {
  isRunning: false,
  speed: 60,
  illuminateCells: true,
  colorFadeSpeed: 0.85,
  textFadeSpeed: 65,
  fadeRefreshRate: 60,
};

export const MouseContext =
  React.createContext<React.MutableRefObject<MouseContextType> | null>(null);

const mouseContext = { position: { x: 0, y: 0 } };

function handleMouseMove(
  mouseRef: React.MutableRefObject<MouseContextType> | null
) {
  return function (e: any) {
    const current = mouseRef?.current;
    if (current) {
      current.position = { x: e.clientX, y: e.clientY };
    }
  };
}

function App() {
  const contextRef = useRef(context);
  const mouseContextRef = useRef(mouseContext);

  return (
    <AppContext.Provider value={contextRef}>
      <MouseContext.Provider value={mouseContextRef}>
        <ComponentWrapper onMouseMove={handleMouseMove(mouseContextRef)}>
          {/* <Controls /> */}
          <TitleBar />
          <Grid />
          {/* <PlayPause /> */}
        </ComponentWrapper>
      </MouseContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
