import { useContext } from "react";
import { AppContext } from "../App/App";

export default function Controls() {
  const isRunningRef = useContext(AppContext);

  function handleClick() {
    if (isRunningRef) {
      const running = isRunningRef.current;
      if (running) isRunningRef.current = false;
      else isRunningRef.current = true;
    }
  }

  return (
    <div>
      Controls
      <button onClick={handleClick}>Pause</button>
    </div>
  );
}
