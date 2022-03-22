import { useRef, useState, useEffect, useContext } from "react";
import {
  AppContext,
  BoardContext,
  BoardPresetsContext,
} from "../Providers/appContexts";
import { BoardGrid } from "./Board.styled";
import { handleResize } from "../../utils/handleResize";
import { createSubGrid } from "../../utils/createBoard";
import { refreshCells } from "../../utils/refreshCells";
import { deepCopyBoard } from "../../utils/utils";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  const appContext = useContext(AppContext);
  const boardContext = useContext(BoardContext);
  const boardPresetsContext = useContext(BoardPresetsContext);

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
    refreshCells(boardContext?.current!, appContext?.current!);
  }, []);

  return (
    <BoardGrid theme={{ height: width }} ref={gridRef}>
      {subGrid}
    </BoardGrid>
  );
}
