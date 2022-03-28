import {
  Refs,
  Board,
  MouseContextType,
  AppContextType,
  BoardContextType,
} from "../types/types";

export function indexToRowCol(index: number): [number, number] {
  const row = Math.floor(index / 9);
  const col = index % 9;
  return [row, col];
}

export function RowColToIndex(row: number, col: number): number {
  return row * 9 + col;
}

export function deepCopyBoard(board: Board): Board {
  const result: Board = [];
  for (let arr of board) {
    result.push([...arr]);
  }
  return result;
}

export function handleRangeBias(
  x: number,
  bias: number,
  type: "exp" | "log"
): number {
  if (type === "exp") {
    x = 1 - x;
    let k = Math.pow(1 - bias, 3);
    k = (x * k) / (x * k - x + 1);
    return 1 - k;
  } else {
    let k = Math.pow(1 - bias, 3);
    k = (x * k) / (x * k - x + 1);
    return k;
  }
}

export function mapNumberRange(
  val: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export function mapRangeWithBias(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  bias: number,
  type: "exp" | "log"
) {
  let mapped = mapNumberRange(value, inMin, inMax, 0, 1);
  mapped = handleRangeBias(mapped, bias, type);
  mapped = mapNumberRange(mapped, 0, 1, outMin, outMax);
  return mapped;
}

export function detectBrowser() {
  const userAgent = navigator.userAgent;
  let browserName;
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }
  return browserName;
}

export function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
