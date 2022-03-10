import { useRef, useState, useEffect } from "react";
import { Refs } from "../types/types";
import { solveBoard } from "../utils/solveBoard";
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
  const [board, setBoard] = useState<(number | null)[][]>(
    deepCopyBoard(hardOne)
  );

  useEffect(
    () => setSubGrid(createSubGrid(cellColorRefs, cellNumberRefs, board)),
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
      [...board],
      setBoard,
      cellColorRefs.current,
      cellNumberRefs.current
    );
  }

  useEffect(function () {
    setInterval(function () {
      refreshCells(cellColorRefs, cellNumberRefs, board);
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
