import { useContext, useEffect } from "react";
import {
  AppContext,
  BoardContext,
  MouseContext,
} from "../Providers/appContexts";
import { onMouseUp } from "../../utils/mouseHover";

export default function SetMousePosition() {
  const appContext = useContext(AppContext);
  const mouseContext = useContext(MouseContext);
  const boardContext = useContext(BoardContext);
  function onPointerMove(e: PointerEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const current = mouseContext?.current!;
    current.position = { x, y };
  }
  function onPointerUp() {
    onMouseUp(boardContext?.current!, appContext?.current!);
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
