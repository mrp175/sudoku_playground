import { useContext } from "react";
import { AppContext } from "../../App/App";
import { AppContextPropNames } from "../../types/types";

export default function Controls() {
  const contextRef = useContext(AppContext);

  function handleClick() {
    const current = contextRef?.current;
    if (current) {
      const isRunning = current.isRunning;
      if (isRunning) current.isRunning = false;
      else current.isRunning = true;
    }
  }

  function handleChange(varName: AppContextPropNames) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      const current = contextRef?.current;
      if (current) {
        current[varName] = +e.target.value;
      }
    };
  }

  function toggleColor() {
    const current = contextRef?.current;
    if (current) {
      const showColor = current.illuminateCells;
      if (showColor) current.illuminateCells = false;
      else current.illuminateCells = true;
    }
  }

  return (
    <div>
      Controls
      <button onClick={handleClick}>Pause</button>
      speed
      <input
        type="range"
        min="1"
        max="360"
        step="1"
        onChange={handleChange("speed")}
      ></input>
      <button onClick={toggleColor}>Illuminate Cells</button>
      color fade speed
      <input
        type="range"
        min="0.01"
        max="0.95"
        step="0.01"
        onChange={handleChange("colorFadeSpeed")}
      ></input>
      text fade speed
      <input
        type="range"
        min="1"
        max="255"
        step="1"
        onChange={handleChange("textFadeSpeed")}
      ></input>
      fade refresh rate
      <input
        type="range"
        min="10"
        max="240"
        step="1"
        onChange={handleChange("fadeRefreshRate")}
      ></input>
    </div>
  );
}
