import { useRef, useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { Refs } from "../types/types";
import { solveBoard, isCellValid } from "../utils/solveBoard";
import { hardOne } from "../utils/boards";
import { Grid, Centered } from "./Board.styled";
import { handleResize, deepCopyBoard } from "../utils/utils";
import { createSubGrid } from "../utils/createBoard";
import { refreshCells } from "../utils/refreshCell";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellColorRefs: Refs = useRef([]);
  const cellNumberRefs: Refs = useRef([]);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  const boardRef = useRef(deepCopyBoard(hardOne));
  const context = useContext(AppContext);

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

  function solve() {
    solveBoard(
      boardRef.current,
      cellColorRefs.current,
      cellNumberRefs.current,
      context?.current!
    );
  }

  useEffect(function () {
    setInterval(function () {
      refreshCells(cellColorRefs, cellNumberRefs, hardOne, boardRef.current);
    }, 1000 / 30);
  }, []);

  return (
    <>
      <button onClick={solve}> check </button>
      <Centered>
        <Grid theme={{ height: width }} ref={gridRef}>
          {subGrid}
        </Grid>
      </Centered>
    </>
  );
}

// 2 4
