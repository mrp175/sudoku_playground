import React, { useRef, useState } from "react";
import Grid from "../Grid/Board";
import Controls from "../Controls/Controls";
import { AppContextType } from "../types/types";

export const AppContext =
  React.createContext<React.MutableRefObject<AppContextType> | null>(null);

const context = {
  isRunning: false,
  speed: 60,
  illuminateCells: true,
  colorFadeSpeed: 80,
  textFadeSpeed: 30,
  fadeRefreshRate: 30,
};

function App() {
  const contextRef = useRef(context);

  return (
    <AppContext.Provider value={contextRef}>
      <div className="App">
        <Controls />
        <Grid />
      </div>
    </AppContext.Provider>
  );
}

export default App;
