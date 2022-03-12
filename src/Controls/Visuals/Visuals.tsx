import { useContext } from "react";
import { AppContext } from "../../App/App";
import { handleRangeBias } from "../../utils/utils";

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

  type VarNames =
    | "colorFadeSpeed"
    | "textFadeSpeed"
    | "speed"
    | "fadeRefreshRate";

  function handleChange(varName: VarNames) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      const current = contextRef?.current;
      console.log(e.target.value);
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

  function test(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    console.log(handleRangeBias(+e.target.value, 0.5, "log"));
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
      <input type="range" min="0" max="1" step="0.001" onChange={test}></input>
    </div>
  );
}
