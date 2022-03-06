import { useRef, useState, useMemo, useEffect } from "react";
import { solveBoard } from "../utils/solveBoard";
import { emptyBoard, hardOne } from "../utils/boards";
import { Grid, Input } from "./Board.styled";
import { createColors } from "../utils/utils";

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const subGridRefs = useRef<HTMLInputElement[]>([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  // const [board, setBoard] = useState<(number | null)[][]>(emptyBoard);
  const [board, setBoard] = useState<(number | null)[][]>(hardOne);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => setHeight(+gridRef.current?.offsetWidth!), [width]);
  useEffect(() => window.addEventListener("resize", handleResize), []);
  useEffect(() => setSubGrid(createSubGrid(subGridRefs)), [board]);
  const [animated, setAnimated] = useState("");
  // useEffect(() => {
  //   if (animated)
  //     subGridRefs.current.forEach((c) => c.classList.add("animate"));
  //   else subGridRefs.current.forEach((c) => c.classList.remove("animate"));
  //   console.log(subGridRefs);
  // }, [animated]);

  function createSubGrid(
    subGridRefs: React.MutableRefObject<HTMLInputElement[]>
  ) {
    const result = [];
    for (let i = 0; i < 9 * 9; i += 1) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      let val: number | null | string = board[row][col];
      if (val === null) val = "";
      result.push(
        <div key={`${row},${col}`}>
          <Input
            className={animated}
            type="number"
            max="9"
            min="0"
            ref={(el) => {
              subGridRefs.current?.push(el!);
            }}
            onChange={(e) => (board[row][col] = +e.target.value)}
            value={val + ""}
          />
        </div>
      );
    }
    return result;
  }

  function editVal() {
    console.log(subGridRefs);
    solveBoard([...board], setBoard, subGridRefs.current);
  }

  // function addRemoveClass(className: string): () => void {
  //   return function () {
  //     if (animated) setAnimated("");
  //     else setAnimated(className);
  //   };
  // }

  return (
    <>
      <button onClick={editVal}> check </button>
      <Grid theme={{ height }} ref={gridRef}>
        {subGrid}
      </Grid>
    </>
  );
}
