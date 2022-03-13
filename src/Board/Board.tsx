import { useRef, useState, useEffect, useContext } from "react";
import { AppContext, BoardContext, MouseContext } from "../App/App";
import { AppContextType, Refs } from "../types/types";
import { solveBoard, isCellValid } from "../utils/solveBoard";
import { hardOne } from "../utils/boards";
import { BoardGrid, Centered } from "./Board.styled";
import { handleResize, deepCopyBoard } from "../utils/utils";
import { createSubGrid } from "../utils/createBoard";
import { refreshCells } from "../utils/refreshCells";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellColorRefs: Refs = useRef([]);
  const cellNumberRefs: Refs = useRef([]);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  const boardRef = useRef(deepCopyBoard(hardOne));
  const context = useContext(AppContext);
  const mouseContext = useContext(MouseContext);
  const boardContext = useContext(BoardContext);

  useEffect(
    () =>
      setSubGrid(
        createSubGrid(cellColorRefs, cellNumberRefs, boardRef.current)
      ),
    []
  );
  useEffect(() => {
    setTimeout(
      () => handleResize(gridRef, cellColorRefs, cellNumberRefs, setWidth),
      1
    );
  }, []);
  useEffect(() => {
    if (boardContext) {
      boardContext.current = [boardRef, cellColorRefs, cellNumberRefs];
    }
  });

  useEffect(function () {
    function refreshTimeout() {
      const refreshRate = context?.current.fadeRefreshRate || 30;
      const current = context?.current;
      const mouse = mouseContext?.current;
      if (current && mouse) {
        refreshCells(
          cellColorRefs,
          cellNumberRefs,
          hardOne,
          boardRef.current,
          current,
          mouse
        );
      }
      setTimeout(() => refreshTimeout(), 1000 / refreshRate);
    }
    refreshTimeout();
  }, []);

  return (
    <>
      <Centered>
        <BoardGrid theme={{ height: width }} ref={gridRef}>
          {subGrid}
        </BoardGrid>
      </Centered>
    </>
  );
}

// 2 4
