import { Refs, SetState } from "../types/types";

export function handleResize(
  ref: React.RefObject<HTMLDivElement>,
  cellColorRefs: Refs,
  cellNumberRefs: Refs,
  setWidth: React.Dispatch<React.SetStateAction<number>>
) {
  const container = ref.current;
  if (container) {
    let width = container.offsetWidth;
    if (width > 800) width = 800;
    setWidth(width);
    const refs = cellColorRefs.current;
    const textRefs = cellNumberRefs.current;
    if (refs && textRefs) {
      for (let i = 0; i < refs.length; i += 1) {
        resizeCell(refs[i][0], width);
        resizeCell(textRefs[i][0], width);
      }
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
