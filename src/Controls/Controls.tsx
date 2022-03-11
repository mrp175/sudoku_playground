import { useContext } from "react";
import { AppContext } from "../App/App";
import { AppContextType } from "../types/types";

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
      console.log(e.target.value);
      const current = contextRef?.current;
      if (current) {
        current[varName] = +e.target.value;
      }
    };
  }
  return (
    <div>
      Controls
      <button onClick={handleClick}>Pause</button>
      speed
      <input type="range" onChange={handleChange("speed")}></input>
      color fade speed
      <input type="range" onChange={handleChange("speed")}></input>
      text fade speed
      <input type="range" onChange={handleChange("speed")}></input>
      fade refresh rate
      <input type="range" onChange={handleChange("speed")}></input>
    </div>
  );
}
