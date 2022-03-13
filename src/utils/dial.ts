export function handleBoundaries(
  min: number,
  max: number,
  currentValue: number
) {
  if (currentValue < min) {
    currentValue = min;
  }
  if (currentValue > max) {
    currentValue = max;
  }
  return currentValue;
}

export class DialState {
  start: number;
  value: number;
  constructor(value: number) {
    this.value = value;
    this.start = value;
  }
}

export function initializeDialPos(init: number, min: number, max: number) {
  return mapNumberRange(init, min, max, -130, 130);
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

export function addGenericEventListener(
  ref: HTMLDivElement | (Window & typeof globalThis),
  type: string,
  callback: any //Fix this once you figure out why it doesn't allow (e: MouseEvent) => void as a type here. It's is convinced it is an EventListenerOrEventListenerObject which is not compatible with MouseEvent
): () => void {
  ref.addEventListener(type, callback);
  return function () {
    ref.removeEventListener(type, callback);
  };
}
