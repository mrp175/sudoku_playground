import { MouseContextType } from "../types/types";

export function mouseHover(
  colorDiv: HTMLDivElement,
  numberDivs: HTMLDivElement[],
  selectedNumber: number,
  mouse: MouseContextType
) {
  const boundingRect = colorDiv.getBoundingClientRect();
  const { left, top, bottom, right } = boundingRect;
  const { x, y } = mouse.position;
  if (x >= left && x <= right && y >= top && y <= bottom) {
    colorDiv.style.opacity = "1";
    numberDivs[selectedNumber - 1].style.opacity = "1";
  }
}

// export function showTextOnHover(
//   div: HTMLDivElement,
//   mouse: MouseContextType,
//   value: number
// ) {
//   const boundingRect = canvas.getBoundingClientRect();
//   const { left, top, bottom, right } = boundingRect;
//   const { x, y } = mouse.position;
//   if (x >= left && x <= right && y >= top && y <= bottom) {
//     div.opacity
//   }
// }
