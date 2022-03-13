import React, { useRef } from "react";
import Board from "../Board/Board";
import Controls from "../ControlPanel/Visuals/Visuals";
import { AppContextType, MouseContextType } from "../types/types";
import { ComponentWrapper, GridContainer } from "./App.styled";
import TitleBar from "../TitleBar/TitleBar";
import { Grid } from "./App.styled";
import ControlPanel from "../ControlPanel/ControlPanel";
import { Refs, BoardRef } from "../types/types";

export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

const context = {
  isRunning: false,
  speed: 23.8,
  illuminateCells: true,
  colorFadeSpeed: 0.757,
  textFadeSpeed: 44.947,
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

export const BoardContext = React.createContext<React.MutableRefObject<
  [BoardRef, Refs, Refs] | null
> | null>(null);

function App() {
  const contextRef = useRef(context);
  const mouseContextRef = useRef(mouseContext);
  const boardContextRef = useRef<[BoardRef, Refs, Refs] | null>(null);

  return (
    <AppContext.Provider value={contextRef}>
      <MouseContext.Provider value={mouseContextRef}>
        <BoardContext.Provider value={boardContextRef}>
          <ComponentWrapper onMouseMove={handleMouseMove(mouseContextRef)}>
            <TitleBar />
            <GridContainer>
              <Grid theme={{ orientation: "landscape" }}>
                <Board />
                <ControlPanel />
              </Grid>
            </GridContainer>
          </ComponentWrapper>
        </BoardContext.Provider>
      </MouseContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
