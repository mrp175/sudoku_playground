import { BoardContextType } from "../types/types";

export function handleResize(
  ref: React.RefObject<HTMLDivElement>,
  boardContext: BoardContextType,
  setWidth: React.Dispatch<React.SetStateAction<number>>
) {
  const { colorCells, numberCells } = boardContext!;
  const container = ref.current;
  if (container) {
    let width = container.offsetWidth;
    if (width > 800) width = 800;
    setWidth(width);
    for (let i = 0; i < colorCells.length; i += 1) {
      resizeCell(colorCells[i][0], width);
      resizeCell(numberCells[i][0], width);
    }
  }
}

function resizeCell(canvas: HTMLCanvasElement, width: number) {
  canvas.width = width / 9;
  canvas.height = width / 9;
}

export function getOrientation(
  screenWidth: number,
  screenHeight: number,
  targetRatio: number
) {
  const currentRatio = screenHeight / screenWidth;
  if (currentRatio < targetRatio) return "landscape";
  return "portrait";
}
