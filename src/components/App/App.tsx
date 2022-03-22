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
import { handleMouseMove } from "../../utils/utils";
import { MouseContext } from "../Providers/appContexts";

function App() {
  const [orientation, setOrientation] = useState("landscape");
  const [screenDimensions, setScreenDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [scale, setScale] = useState(1);
  const appWrapperRef = useRef<HTMLDivElement>(null);
  const mouseContextRef = useContext(MouseContext);

  return (
    <>
      <ManageScreenDimensions
        orientation={orientation}
        setOrientation={setOrientation}
        screenDimensions={screenDimensions}
        setScreenDimensions={setScreenDimensions}
        appWrapperRef={appWrapperRef}
        setScale={setScale}
      />
      <ComponentWrapper onMouseMove={handleMouseMove(mouseContextRef)}>
        <TitleBar />
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
    </>
  );
}

export default App;
