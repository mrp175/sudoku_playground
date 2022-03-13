import React, { useRef } from "react";
import Board from "../Board/Board";
import Controls from "../ControlPanel/Visuals/Visuals";
import { AppContextType, MouseContextType } from "../types/types";
import { ComponentWrapper, GridContainer } from "./App.styled";
import PlayPause from "../ControlPanel/PlayPause/PlayPause";
import TitleBar from "../TitleBar/TitleBar";
import { Grid } from "./App.styled";
import ControlPanel from "../ControlPanel/ControlPanel";

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
          <GridContainer>
            <Grid theme={{ orientation: "landscape" }}>
              <Board />
              <ControlPanel />
            </Grid>
          </GridContainer>
          {/* <PlayPause /> */}
        </ComponentWrapper>
      </MouseContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
