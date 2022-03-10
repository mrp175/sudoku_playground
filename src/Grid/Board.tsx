import { useRef, useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { Refs } from "../types/types";
import { solveBoard, isCellValid } from "../utils/solveBoard";
import { emptyBoard as hardOne } from "../utils/boards";
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
  const [newBoard, setNewBoard] = useState<(number | null)[][]>(
    deepCopyBoard(hardOne)
  );
  const isRunningRef = useContext(
    AppContext
  ) as React.MutableRefObject<boolean>;

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
      newBoard,
      setBoard,
      cellColorRefs.current,
      cellNumberRefs.current,
      isRunningRef
    );
  }

  useEffect(function () {
    setInterval(function () {
      refreshCells(cellColorRefs, cellNumberRefs, hardOne, newBoard);
    }, 1000 / 30);
  }, []);

  // useEffect(function () {
  //   hardOne[0][1] = 9;
  //   console.log(isCellValid(0, 1, hardOne));
  // }, []);

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
