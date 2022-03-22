import { useContext } from "react";
import { Component } from "./ControlPanel.styled";
import Slider from "../Slider/Slider";
import { primary_color, secondary_color } from "../../styleVars/styleVars";
import Dial from "../Dial/Dial";
import MuiButton from "../MuiButton/MuiButton";
import {
  AppContext,
  BoardContext,
  BoardPresetsContext,
  IsRunningContext,
  OrientationContext,
} from "../Providers/appContexts";
import { solveBoard } from "../../utils/solveBoard";
import { createAvailableIndexes } from "../../utils/traversalTypes/createAvailableCellsArray";
import { deepCopyBoard } from "../../utils/utils";
import { StateSetState } from "../../types/types";

export default function ControlPanel() {
  const appContext = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const boardPresetsContext = useContext(BoardPresetsContext);
  const [isRunning, setIsRunning] = useContext(
    IsRunningContext
  ) as StateSetState<boolean>;
  const orientation = useContext(OrientationContext) as string;

  function playPause() {
    if (appContext && appContext.current) {
      if (appContext.current.isRunning === false) {
        appContext.current.isRunning = true;
        const availableCellIndexes = createAvailableIndexes(
          boardContext?.current!,
          appContext.current.traversalDirection
        );
        setIsRunning(true);
        solveBoard(
          boardContext?.current!,
          appContext.current,
          availableCellIndexes,
          setIsRunning
        );
      } else {
        appContext.current.isRunning = false;
        setIsRunning(false);
      }
    }
    console.log(new Date().getTime());
  }

  function resetBoard() {
    const current = boardContext?.current!;
    current.board = deepCopyBoard(boardPresetsContext![1]);
  }

  return (
    <Component theme={{ orientation }}>
      <div className={orientation}>
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
      <div className={orientation}>
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
      <div className={orientation}>
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
