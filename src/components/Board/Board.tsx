import { useRef, useState, useEffect, useContext } from "react";
import { AppContext, BoardContext, MouseContext } from "../App/App";
import { CellColorsRef, CellNumbersRef } from "../../types/types";
import { _075 as hardOne } from "../../utils/boards";
import { BoardGrid } from "./Board.styled";
import { createSubGrid } from "../../utils/createBoard";
import { refreshCells } from "../../utils/refreshCells";
import { deepCopyBoard } from "../../utils/utils";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellColorsRef: CellColorsRef = useRef([]);
  const cellNumbersRef: CellNumbersRef = useRef([]);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  const boardRef = useRef(deepCopyBoard(hardOne));
  const context = useContext(AppContext);
  const mouseContext = useContext(MouseContext);
  const boardContext = useContext(BoardContext);

  useEffect(
    () =>
      setSubGrid(
        createSubGrid(cellColorsRef, cellNumbersRef, boardRef.current)
      ),
    []
  );
  // useEffect(() => {
  //   setTimeout(
  //     () => handleResize(gridRef, cellColorsRef, cellNumbersRef, setWidth),
  //     1
  //   );
  // }, []);

  useEffect(() => {
    if (boardContext) {
      boardContext.current = [boardRef, cellColorsRef, cellNumbersRef];
    }
  });

  useEffect(function () {
    function refreshTimeout() {
      const refreshRate = context?.current.fadeRefreshRate || 30;
      const current = context?.current;
      const mouse = mouseContext?.current;
      if (current && mouse) {
        refreshCells(
          cellColorsRef,
          cellNumbersRef,
          hardOne,
          boardRef.current,
          current,
          mouse
        );
      }
      setTimeout(() => requestAnimationFrame(refreshTimeout), 1000 / 60);
    }
    refreshTimeout();
  }, []);

  return (
    <>
      <BoardGrid theme={{ height: width }} ref={gridRef}>
        {subGrid}
      </BoardGrid>
    </>
  );
}
