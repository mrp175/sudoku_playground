import { Input } from "../Grid/Board.styled";

export function createSubGrid(
  subGridRefs: React.MutableRefObject<HTMLInputElement[]>
) {
  const result = [];
  for (let i = 0; i < 9 * 9; i += 1) {
    result.push(
      <div>
        <Input
          type="number"
          max="9"
          min="0"
          ref={(el) => {
            subGridRefs.current?.push(el!);
          }}
        />
      </div>
    );
  }
  return result;
}

export function createColors() {
  const result = [];
  let increment = 360 / 9;
  let hue = 0;
  for (let i = 0; i <= 9; i += 1) {
    result.push(`hsl(${hue}, 40%, 75%)`);
    hue += increment;
  }
  return result;
}

// export function colorCell(
//   value: number,
//   row: number,
//   col: number,
//   refs: HTMLCanvasElement[]
// ): void {
//   const index = row * 9 + col;
//   if (value === 0) {
//     refs[index].style.background = "white";
//     refs[index].style.transition = "1.5s ease";
//     return;
//   }
//   refs[index].style.transition = "0.1s ease";
//   refs[index].style.background = colors[value];
//   refs[index].style.transform = "scale(110%)";
//   setTimeout(function () {
//     refs[index].style.background = "white";
//     refs[index].style.transition = "1.5s ease, transform 0.1s ease";
//     refs[index].style.transform = "scale(100%)";
//   }, 100);
// }

export function updateDisplayValue(
  value: number,
  row: number,
  col: number,
  refs: HTMLInputElement[]
) {
  const index = row * 9 + col;
  refs[index].value = value + "";
}

export function drawNumberToCell(
  value: number,
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][]
) {
  if (value === null) return;
  const index = row * 9 + col;
  const [canvas, ctx] = refs[index];
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "bold 30pt Courier";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(value + "", canvas.width / 2, canvas.height / 2 + 2);
  ctx.closePath();
}

const colors = createColors();

export function colorCell(
  value: number,
  row: number,
  col: number,
  refs: [HTMLCanvasElement, CanvasRenderingContext2D][]
) {
  const index = row * 9 + col;
  const [canvas, ctx] = refs[index];
  ctx.beginPath();
  ctx.fillStyle = colors[value - 1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.closePath();
}
