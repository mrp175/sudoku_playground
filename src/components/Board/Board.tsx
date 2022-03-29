import { useRef, useState, useEffect, useContext } from "react";
import {
  AppContext,
  BoardContext,
  BoardPresetsContext,
  IsRunningContext,
  MouseContext,
  ResetStateContext,
} from "../Providers/appContexts";
import { BoardGrid } from "./Board.styled";
import { handleResize } from "../../utils/handleResize";
import { createSubGrid } from "../../utils/createBoard";
import { refreshCells } from "../../utils/refreshCells";
import { deepCopyBoard } from "../../utils/utils";
import { StateSetState } from "../../types/types";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  const appContext = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const boardPresetsContext = useContext(BoardPresetsContext);
  const mouseContext = useContext(MouseContext);
  const resetState = useContext(ResetStateContext);
  const [isRunning, setIsRunning] = useContext(
    IsRunningContext
  ) as StateSetState<boolean>;

  useEffect(() => {
    if (boardContext && boardContext.current && boardPresetsContext) {
      const current = boardContext.current;
      current.board = deepCopyBoard(boardPresetsContext[1]);
      current.originalBoard = deepCopyBoard(boardPresetsContext[1]);
      setSubGrid(createSubGrid(boardContext?.current!));
    }
  }, []);

  useEffect(() => {
    setTimeout(
      () => handleResize(gridRef, boardContext?.current!, setWidth),
      1
    );
  }, []);

  useEffect(function () {
    refreshCells(
      boardContext?.current!,
      appContext?.current!,
      mouseContext?.current!
    );
  }, []);

  return (
    <BoardGrid
      className={isRunning ? "no-pointer-events" : ""}
      theme={{ height: width }}
      ref={gridRef}
    >
      {subGrid}
    </BoardGrid>
  );
}
