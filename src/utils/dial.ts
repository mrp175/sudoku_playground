import { mapNumberRange } from "./utils";

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
