import { useRef, useState, useContext } from "react";
import Board from "../Board/Board";
import {
  Grid,
  ComponentWrapper,
  GridContainer,
  PreventHorizontalScroll,
  PreventVerticalScroll,
} from "./App.styled";
import TitleBar from "../TitleBar/TitleBar";
import ControlPanel from "../ControlPanel/ControlPanel";
import NumberSelectionPanel from "../NumberSelectionPanel/NumberSelectionPanel";
import BoardSelectionMenu from "../BoardSelectionMenu/BoardSelectionMenu";
import ManageScreenDimensions from "../Utils/ManageScreenDimensions";
import { gridDimensions } from "../../styleVars/styleVars";
import {
  OrientationContext,
  ScreenDimensionsContext,
} from "../Providers/appContexts";
import SetMousePosition from "../SetMousePosition/SetMousePosition";

function App() {
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [scale, setScale] = useState(1);
  const appWrapperRef = useRef<HTMLDivElement>(null);
  const [orientation, setOrientation] = useState("landscape");

  return (
    <>
      <SetMousePosition />
      <ScreenDimensionsContext.Provider value={screenDimensions}>
        <OrientationContext.Provider value={orientation}>
          <ManageScreenDimensions
            orientation={orientation}
            setOrientation={setOrientation}
            screenDimensions={screenDimensions}
            setScreenDimensions={setScreenDimensions}
            appWrapperRef={appWrapperRef}
            setScale={setScale}
          />
          <ComponentWrapper>
            <TitleBar screenDimensions={screenDimensions} />
            <GridContainer theme={{ orientation, scale }} ref={appWrapperRef}>
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
      </ScreenDimensionsContext.Provider>
    </>
  );
}

export default App;
