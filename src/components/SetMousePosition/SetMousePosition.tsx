import { useContext, useEffect } from "react";
import { MouseContext } from "../Providers/appContexts";

export default function SetMousePosition() {
  const mouseContext = useContext(MouseContext);
  function onPointerMove(e: PointerEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const current = mouseContext?.current!;
    current.position = { x, y };
  }
  function onPointerUp() {
    const current = mouseContext?.current!;
    current.position = { x: null, y: null };
  }
  useEffect(function () {
    window.addEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(function () {
    window.addEventListener("pointerup", onPointerUp);
  }, []);
  return <></>;
}
