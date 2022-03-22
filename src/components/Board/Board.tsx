import { useRef, useState, useEffect, useContext } from "react";
import { AppContext, BoardContext } from "../Providers/appContexts";
import { BoardGrid } from "./Board.styled";
import { handleResize } from "../../utils/handleResize";
import { createSubGrid } from "../../utils/createBoard";
import { refreshCells } from "../../utils/refreshCells";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  const appContext = useContext(AppContext);
  const boardContext = useContext(BoardContext);

  useEffect(() => {
    setSubGrid(createSubGrid(boardContext?.current!));
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
