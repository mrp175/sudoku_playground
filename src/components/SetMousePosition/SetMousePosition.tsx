import { useContext, useEffect } from "react";
import {
  AppContext,
  BoardContext,
  MouseContext,
  ResetStateContext,
} from "../Providers/appContexts";
import { onMouseUp } from "../../utils/mouseHover";
import { StateSetState } from "../../types/types";

export default function SetMousePosition() {
  const appContext = useContext(AppContext);
  const mouseContext = useContext(MouseContext);
  const boardContext = useContext(BoardContext);
  const resetStateContext = useContext(ResetStateContext);
  const [u, setUserSelectionExists] =
    resetStateContext?.userSelectionExists as StateSetState<boolean>;

  function onPointerMove(e: PointerEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const current = mouseContext?.current!;
    current.position = { x, y };
  }

  function onPointerUp() {
    onMouseUp(
      boardContext?.current!,
      appContext?.current!,
      setUserSelectionExists
    );
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
