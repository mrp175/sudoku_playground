import { useContext, useEffect, useState } from "react";
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
  ResetStateContext,
} from "../Providers/appContexts";
import {
  AppContextType,
  BoardContextType,
  StateSetState,
} from "../../types/types";
import {
  playPause,
  resetBoard,
  clearUserInput,
} from "../../utils/playPauseReset";

export default function ControlPanel() {
  const appContextRef = useContext(AppContext);
  const boardContextRef = useContext(BoardContext);
  const [isRunning, setIsRunning] = useContext(
    IsRunningContext
  ) as StateSetState<boolean>;
  const orientation = useContext(OrientationContext) as string;
  const resetState = useContext(ResetStateContext);
  const [buttonText, setButtonText] = useState("RESET BOARD");
  const [userSelectionExists, setUserSelectionExists] =
    resetState?.userSelectionExists as StateSetState<boolean>;
  const [hasRun, setHasRun] = resetState?.hasRun as StateSetState<boolean>;

  function returnPlayPause() {
    const boardContext = boardContextRef?.current as BoardContextType;
    const appContext = appContextRef?.current as AppContextType;
    return playPause(boardContext, appContext, setHasRun, setIsRunning);
  }

  function returnResetBoard() {
    const boardContext = boardContextRef?.current as BoardContextType;
    const appContext = appContextRef?.current as AppContextType;
    appContext.totalCount = 0;
    return resetBoard(boardContext, appContext, setHasRun);
  }

  function returnClearUserInput() {
    const boardContext = boardContextRef?.current as BoardContextType;
    const appContext = appContextRef?.current as AppContextType;
    appContext.totalCount = 0;
    return clearUserInput(boardContext, appContext, setUserSelectionExists);
  }

  useEffect(
    function () {
      if (hasRun) setButtonText("RESET BOARD");
      else if (userSelectionExists) setButtonText("CLEAR USER INPUT");
      else setButtonText("RESET BOARD");
    },
    [hasRun, userSelectionExists]
  );

  return (
    <Component theme={{ orientation }}>
      <div className={orientation}>
        <MuiButton
          onClick={returnPlayPause}
          color={primary_color}
          isDisabled={false}
          width={200}
        >
          {isRunning ? "PAUSE" : "SOLVE BOARD"}
        </MuiButton>
        <MuiButton
          onClick={
            buttonText === "CLEAR USER INPUT"
              ? returnClearUserInput
              : returnResetBoard
          }
          color={secondary_color}
          isDisabled={isRunning}
          width={200}
        >
          {buttonText}
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
