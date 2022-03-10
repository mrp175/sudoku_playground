import { useRef, useState, useMemo, useEffect } from "react";
import { solveBoard } from "../utils/solveBoard";
import { emptyBoard, hardOne } from "../utils/boards";
import { Grid, Input, Canvas, Centered, Cell } from "./Board.styled";
import { createColors, drawNumberToCell } from "../utils/utils";

type CAC = [HTMLCanvasElement, CanvasRenderingContext2D];
type Refs = React.MutableRefObject<CAC[]>;

export default function Board() {
  const gridRef = useRef<HTMLDivElement>(null);
  const subGridRefs: Refs = useRef([]);
  const cellTextRefs: Refs = useRef([]);
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
    const textRefs = cellTextRefs.current;
    if (textRefs) {
      for (let ref of textRefs) {
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
    const colorRefs = subGridRefs.current;
    const numberRefs = cellTextRefs.current;
    for (let i = 0; i < 9 * 9; i += 1) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      let val: number | null | string = board[row][col];
      if (val === null) val = "";
      result.push(
        <Cell key={`${row},${col}`}>
          <Canvas
            ref={(el) => {
              colorRefs.push([el!, el?.getContext("2d")!]);
            }}
          />
          <Canvas
            ref={(el) => {
              numberRefs.push([el!, el?.getContext("2d")!]);
            }}
          />
        </Cell>
      );
    }
    return result;
  }

  // setInterval(function () {
  //   fadeOut(refs[i]);
  // }, 1000 / 1);

  function fadeOut(colorRefs: Refs, numberRefs: Refs): void {
    const colors = colorRefs.current;
    const numbers = numberRefs.current;
    if (colors && numbers) {
      for (let i = 0; i < colors.length; i += 1) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        let [canvas, ctx] = colors[i];
        // const pixelData = ctx.getImageData(0, 0, 1, 1).data;
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        // if (pixelData[0] >= 250 || pixelData[1] >= 250 || pixelData[2] >= 250)
        //   ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        [canvas, ctx] = numbers[i];
        drawNumberToCell(board[row][col] as number, row, col, numbers);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }

  function editVal() {
    solveBoard([...board], setBoard, subGridRefs.current, cellTextRefs.current);
  }

  // function addRemoveClass(className: string): () => void {
  //   return function () {
  //     if (animated) setAnimated("");
  //     else setAnimated(className);
  //   };
  // }

  useEffect(function () {
    setInterval(function () {
      fadeOut(subGridRefs, cellTextRefs);
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
