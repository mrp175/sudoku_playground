import { useState, useRef } from "react";
import {
  AppContext,
  MouseContext,
  BoardContext,
  IsRunningContext,
  BoardPresetsContext,
  ResetStateContext,
} from "./appContexts";
import {
  defaultRunningState,
  appContext,
  mouseContext,
  boardContext,
} from "./appContexts";
import { boards } from "../../utils/boards";

export default function Providers({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const appContextRef = useRef(appContext);
  const mouseContextRef = useRef(mouseContext);
  const boardContextRef = useRef(boardContext);
  const [isRunning, setIsRunning] = useState(defaultRunningState);
  const resetStateContext = {
    hasRun: useState(false),
    userSelectionExists: useState(false),
  };

  return (
    <AppContext.Provider value={appContextRef}>
      <MouseContext.Provider value={mouseContextRef}>
        <BoardContext.Provider value={boardContextRef}>
          <BoardPresetsContext.Provider value={boards}>
            <IsRunningContext.Provider value={[isRunning, setIsRunning]}>
              <ResetStateContext.Provider value={resetStateContext}>
                {children}
              </ResetStateContext.Provider>
            </IsRunningContext.Provider>
          </BoardPresetsContext.Provider>
        </BoardContext.Provider>
      </MouseContext.Provider>
    </AppContext.Provider>
  );
}
