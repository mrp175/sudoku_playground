import { useRef, useState, useMemo, useEffect } from "react";
import { solveBoard } from "../utils/solveBoard";
import { emptyBoard, hardOne } from "../utils/boards";
import { Grid, Input, Canvas, Centered } from "./Board.styled";
import { createColors } from "../utils/utils";

type Refs = React.MutableRefObject<
  [HTMLCanvasElement, CanvasRenderingContext2D][]
>;

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const subGridRefs: Refs = useRef([]);
  const [width, setWidth] = useState(0);
  const [subGrid, setSubGrid] = useState<JSX.Element[]>([]);
  // const [board, setBoard] = useState<(number | null)[][]>(emptyBoard);
  const [board, setBoard] = useState<(number | null)[][]>(hardOne);

  function handleResize(container: HTMLDivElement) {
    let width = container.offsetWidth;
    console.log(container, width);
    if (width > 800) width = 800;
    setWidth(width);
    const refs = subGridRefs.current;
    if (refs) {
      for (let ref of refs) {
        const canvas = ref[0];
        canvas.height = width / 9;
        canvas.width = width / 9;
      }
    }
  }

  useEffect(
    () =>
      window.addEventListener("resize", () => handleResize(gridRef?.current!)),
    []
  );
  useEffect(() => setSubGrid(createSubGrid(subGridRefs)), []);
  useEffect(() => {
    setTimeout(() => handleResize(gridRef?.current!), 1);
  }, []);
  // useEffect(() => {
  //   if (animated)
  //     subGridRefs.current.forEach((c) => c.classList.add("animate"));
  //   else subGridRefs.current.forEach((c) => c.classList.remove("animate"));
  //   console.log(subGridRefs);
  // }, [animated]);

  function createSubGrid(subGridRefs: Refs) {
    const result = [];
    const refs = subGridRefs.current;
    for (let i = 0; i < 9 * 9; i += 1) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      let val: number | null | string = board[row][col];
      if (val === null) val = "";
      result.push(
        <Canvas
          key={`${row},${col}`}
          ref={(el) => {
            refs.push([el!, el?.getContext("2d")!]);
          }}
        />
      );
    }
    return result;
  }

  // setInterval(function () {
  //   fadeOut(refs[i]);
  // }, 1000 / 1);

  function fadeOut(refs: {
    current: [HTMLCanvasElement, CanvasRenderingContext2D][];
  }): void {
    const current = refs.current;
    if (current) {
      for (let ref of current) {
        const [canvas, ctx] = ref;
        const pixelData = ctx.getImageData(0, 0, 1, 1).data;
        const rgba = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${
          pixelData[3] / 255
        })`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        if (pixelData[0] >= 250 || pixelData[1] >= 250 || pixelData[2] >= 250)
          ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  function editVal() {
    solveBoard([...board], setBoard, subGridRefs.current);
  }

  // function addRemoveClass(className: string): () => void {
  //   return function () {
  //     if (animated) setAnimated("");
  //     else setAnimated(className);
  //   };
  // }

  useEffect(function () {
    setInterval(function () {
      fadeOut(subGridRefs);
    }, 1000 / 30);
  }, []);

  return (
    <>
      <button onClick={editVal}> check </button>
      <Centered>
        <Grid theme={{ height: width }} ref={gridRef}>
          {subGrid}
        </Grid>
      </Centered>
    </>
  );
}
