import { useContext, useState } from "react";
import { Component } from "./ControlPanel.styled";
import Slider from "../Slider/Slider";
import { primary_color, secondary_color } from "../../styleVars/styleVars";
import Dial from "../Dial/Dial";
import MuiButton from "../MuiButton/MuiButton";
import { AppContext, BoardContext, BoardPresetsContext } from "../App/App";
import { solveBoard } from "../../utils/solveBoard";
import { deepCopyBoard } from "../../utils/utils";

export default function ControlPanel() {
  const appContext = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const boardPresetsContext = useContext(BoardPresetsContext);
  const [isRunning, setIsRunning] = useState(false);

  function playPause() {
    if (appContext?.current && boardContext?.current) {
      const [boardRef, cellColorRefs, cellTextRefs, cellBloomRefs] =
        boardContext.current;
      if (!appContext.current.isRunning) {
        appContext.current.isRunning = true;
        setIsRunning(true);
        solveBoard(
          boardRef.current,
          cellColorRefs.current,
          cellTextRefs.current,
          cellBloomRefs.current,
          appContext.current
        );
      } else {
        appContext.current.isRunning = false;
        setIsRunning(false);
      }
    }
  }

  function resetBoard() {
    let current = boardContext?.current;
    if (current) {
      current[0].current = deepCopyBoard(boardPresetsContext![1]);
    }
  }

  return (
    <Component>
      <div>
        <MuiButton onClick={playPause} color={primary_color} isDisabled={false}>
          {isRunning ? "PAUSE" : "SOLVE BOARD"}
        </MuiButton>
        <MuiButton
          onClick={resetBoard}
          color={secondary_color}
          isDisabled={isRunning}
        >
          RESET BOARD
        </MuiButton>
      </div>
      <div>
        <Dial
          min={0}
          max={100}
          step={1}
          init={50}
          log={0}
          logType="log"
          dbType="linear"
          waveformId="1"
        />
      </div>
      <div>
        <Slider
          textLabel="Color Fade Duration"
          appContextPropName="colorFadeSpeed"
          min={0}
          max={0.92}
          bias={0.4}
          expType="exp"
        />
        <Slider
          textLabel="Text Fade Duration"
          appContextPropName="textFadeSpeed"
          min={255}
          max={10}
          bias={0.45}
          expType="exp"
        />
      </div>
    </Component>
  );
}
