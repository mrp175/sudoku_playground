import { useRef, useState, useEffect, useContext } from "react";
import { AppContext, BoardContext, MouseContext } from "../App/App";
import { BloomCellsRef, Refs } from "../../types/types";
import { hardOne } from "../../utils/boards";
import { BoardGrid } from "./Board.styled";
import { handleResize } from "../../utils/handleResize";
import { createSubGrid } from "../../utils/createBoard";
import { refreshCells } from "../../utils/refreshCells";
import { deepCopyBoard } from "../../utils/utils";

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
  const cellBloomRefs: BloomCellsRef = useRef([]);

  useEffect(
    () =>
      setSubGrid(
        createSubGrid(
          cellColorRefs,
          cellNumberRefs,
          cellBloomRefs,
          boardRef.current
        )
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
      boardContext.current = [
        boardRef,
        cellColorRefs,
        cellNumberRefs,
        cellBloomRefs,
      ];
    }
  });

  useEffect(function () {
    const refreshRate = context?.current.fadeRefreshRate || 30;
    const current = context?.current;
    const mouse = mouseContext?.current;
    if (current && mouse) {
      refreshCells(
        cellColorRefs,
        cellNumberRefs,
        cellBloomRefs,
        hardOne,
        boardRef,
        current,
        mouse
      );
    }
  }, []);

  return (
    <>
      <BoardGrid theme={{ height: width }} ref={gridRef}>
        {subGrid}
      </BoardGrid>
    </>
  );
}
