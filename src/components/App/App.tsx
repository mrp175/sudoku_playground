import React, { useMemo, useRef, useState } from "react";
import Board from "../Board/Board";
import {
  AppContextType,
  CellBloomRefs,
  MouseContextType,
} from "../../types/types";
import { ComponentWrapper, GridContainer } from "./App.styled";
import TitleBar from "../TitleBar/TitleBar";
import { Grid } from "./App.styled";
import ControlPanel from "../ControlPanel/ControlPanel";
import { Refs, BoardRef, Board as BoardType } from "../../types/types";
import NumberSelectionPanel from "../NumberSelectionPanel/NumberSelectionPanel";
import { setBoardPresets } from "../../utils/setBoardPresets";
import { boards } from "../../utils/boards";

export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

const context: AppContextType = {
  isRunning: false,
  speed: 23.8,
  illuminateCells: true,
  colorFadeSpeed: 0.757,
  textFadeSpeed: 44.947,
  fadeRefreshRate: 60,
  selectedNumber: 1,
  traversalDirection: "down",
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
  [BoardRef, Refs, Refs, CellBloomRefs] | null
> | null>(null);

export const BoardPresetsContext = React.createContext<
  (number | null)[][][] | null
>(null);

function App() {
  const contextRef = useRef(context);
  const mouseContextRef = useRef(mouseContext);
  const boardContextRef = useRef<[BoardRef, Refs, Refs, CellBloomRefs] | null>(
    null
  );

  return (
    // <CombineProviders components={[AppContext, MouseContext, BoardContext]}></CombineProviders>
    <AppContext.Provider value={contextRef}>
      <MouseContext.Provider value={mouseContextRef}>
        <BoardContext.Provider value={boardContextRef}>
          <BoardPresetsContext.Provider value={boards}>
            <ComponentWrapper onMouseMove={handleMouseMove(mouseContextRef)}>
              <TitleBar />
              <GridContainer>
                <Grid theme={{ orientation: "landscape" }}>
                  <NumberSelectionPanel />
                  <Board />
                  <ControlPanel />
                </Grid>
              </GridContainer>
            </ComponentWrapper>
          </BoardPresetsContext.Provider>
        </BoardContext.Provider>
      </MouseContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
