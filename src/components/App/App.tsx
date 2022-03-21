import React, { useRef, useState, useEffect, useContext } from "react";
import Board from "../Board/Board";
import {
  AppContextType,
  BloomCellsRef,
  MouseContextType,
} from "../../types/types";
import {
  ComponentWrapper,
  GridContainer,
  PreventHorizontalScroll,
  PreventVerticalScroll,
} from "./App.styled";
import TitleBar from "../TitleBar/TitleBar";
import { Grid } from "./App.styled";
import ControlPanel from "../ControlPanel/ControlPanel";
import { Refs, BoardRef, Board as BoardType } from "../../types/types";
import NumberSelectionPanel from "../NumberSelectionPanel/NumberSelectionPanel";
import { setBoardPresets } from "../../utils/setBoardPresets";
import { boards } from "../../utils/boards";
import { StateSetState } from "../../types/types";
import { getOrientation } from "../../utils/handleResize";
import { detectBrowser } from "../../utils/utils";
import BoardSelectionMenu from "../BoardSelectionMenu/BoardSelectionMenu";

export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

const running = false;

const context: AppContextType = {
  isRunning: running,
  speed: 152.36,
  illuminateCells: true,
  colorFadeSpeed: 0.757,
  textFadeSpeed: 44.947,
  fadeRefreshRate: 60,
  selectedNumber: 1,
  traversalDirection: "down",
  currentHead: [0, 0],
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
  [BoardRef, Refs, Refs, BloomCellsRef] | null
> | null>(null);

export const BoardPresetsContext = React.createContext<
  (number | null)[][][] | null
>(null);

export const IsRunningContext =
  React.createContext<StateSetState<boolean> | null>(null);

export const OrientationContext = React.createContext<string | null>(null);

function App() {
  const padding = 20;
  const gridAspectRatio = 0.55;
  const contextRef = useRef(context);
  const mouseContextRef = useRef(mouseContext);
  const boardContextRef = useRef<[BoardRef, Refs, Refs, BloomCellsRef] | null>(
    null
  );
  const [isRunning, setIsRunning] = useState(running);
  const [orientation, setOrientation] = useState("landscape");
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [scale, setScale] = useState(1);
  const appWrapperRef = useRef<HTMLDivElement>(null);
  const gridDimensions = {
    landscape: {
      width: 1366,
      height: 736,
    },
    portrait: {
      width: 738,
      height: 1118,
    },
  };

  useEffect(() => {
    const current = appWrapperRef.current;
    if (current) {
      setScreenDimensions({
        width: current.clientWidth,
        height: current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const current = appWrapperRef.current;
      if (current) {
        setScreenDimensions({
          width: current.clientWidth,
          height: current.clientHeight,
        });
      }
    });
  }, []);

  useEffect(() => {
    let currentOrientation = "landscape";
    if (window.innerWidth < 1430 || window.innerHeight < 830) {
      currentOrientation = getOrientation(
        screenDimensions.width,
        screenDimensions.height,
        gridAspectRatio
      );
    }
    setOrientation(currentOrientation);
  }, [screenDimensions]);

  useEffect(() => {
    let scale = 1;
    if (
      orientation === "portrait" &&
      screenDimensions.width < 738 + padding * 2
    ) {
      scale = (screenDimensions.width - padding * 2) / 738;
    } else if (
      orientation === "landscape" &&
      screenDimensions.height < 736 + padding * 2
    ) {
      scale = (screenDimensions.height - padding * 2) / 736;
    }
    setScale(scale);
  }, [screenDimensions, orientation]);

  return (
    // <CombineProviders components={[AppContext, MouseContext, BoardContext]}></CombineProviders>
    <AppContext.Provider value={contextRef}>
      <MouseContext.Provider value={mouseContextRef}>
        <BoardContext.Provider value={boardContextRef}>
          <BoardPresetsContext.Provider value={boards}>
            <IsRunningContext.Provider value={[isRunning, setIsRunning]}>
              <OrientationContext.Provider value={orientation}>
                <ComponentWrapper
                  onMouseMove={handleMouseMove(mouseContextRef)}
                >
                  <TitleBar />
                  <GridContainer
                    theme={{ orientation, scale }}
                    ref={appWrapperRef}
                  >
                    <PreventHorizontalScroll
                      theme={{ scale, orientation, dimensions: gridDimensions }}
                    >
                      <PreventVerticalScroll
                        theme={{
                          scale,
                          orientation,
                          dimensions: gridDimensions,
                        }}
                      >
                        <Grid
                          theme={{
                            orientation,
                            scale,
                            dimensions: gridDimensions,
                          }}
                        >
                          <NumberSelectionPanel />
                          <Board />
                          <ControlPanel />
                        </Grid>
                      </PreventVerticalScroll>
                    </PreventHorizontalScroll>
                  </GridContainer>
                  <BoardSelectionMenu />
                </ComponentWrapper>
              </OrientationContext.Provider>
            </IsRunningContext.Provider>
          </BoardPresetsContext.Provider>
        </BoardContext.Provider>
      </MouseContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
