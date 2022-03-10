import React, { useRef, useState } from "react";
import Grid from "../Grid/Board";
import Controls from "../Controls/Controls";

export const AppContext =
  React.createContext<React.MutableRefObject<boolean> | null>(null);

function App() {
  const isRunningRef = useRef(false);
  return (
    <AppContext.Provider value={isRunningRef}>
      <div className="App">
        <Controls />
        <Grid />
      </div>
    </AppContext.Provider>
  );
}

export default App;
