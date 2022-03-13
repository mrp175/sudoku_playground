/* eslint-disable */
import { useRef, useEffect, useState, useContext } from "react";
import { MouseInput } from "../utils/handleMouseInput";
import {
  handleBoundaries,
  initializeDialPos,
  handleRangeBias,
  mapNumberRange,
  addGenericEventListener,
} from "../utils/dial";
import { DialState } from "../utils/dial";
import { DialType, NewMouseState, MouseState } from "../types/types";
import {
  Component,
  Line,
  LineContainer,
  Background,
  Knob,
  Text,
  Canvas,
} from "./Dial.styled";
import { AppContext } from "../App/App";

export default function Dial({
  min,
  max,
  step,
  init,
  log,
  logType,
  dbType,
  waveformId,
}: DialType) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [dialPos, setDialPos] = useState<number>(0);
  const mouse = new MouseInput();
  const initDialVal = initializeDialPos(init, min, max);
  const dial = new DialState(initDialVal);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appContext = useContext(AppContext);

  function mapMouseToDial(mouse: MouseState) {
    const change = mouse.y.distanceTravelled;
    let valueInDeg = dial.start + change;
    if (valueInDeg > 130) valueInDeg = 130;
    if (valueInDeg < -130) valueInDeg = -130;
    const steps = Math.floor(valueInDeg / 6.5) * 6.5;
    setSpeed(steps);
    return steps;
  }

  function setSpeed(dialVal: number) {
    const current = appContext?.current;
    if (current) {
      let mapped = mapNumberRange(dialVal, -130, 130, 0, 1);
      mapped = handleRangeBias(mapped, 0.6, "log");
      mapped = mapNumberRange(mapped, 0, 1, 1, 380);
      mapped = Math.round((mapped + Number.EPSILON) * 100) / 100;
      current.speed = mapped;
    }
  }

  function handleMouseMove(
    mouse: MouseState,
    ref: HTMLDivElement | undefined
  ): void {
    let state = 0;
    if (mouse.isDown) {
      setDialPos((s): number => {
        state = s;
        return mapMouseToDial(mouse);
      });
    }
  }

  function handleMouseUp(
    mouse: MouseState,
    ref: HTMLDivElement | undefined
  ): void {
    if (mouse.isDown) {
      setDialPos((s): number => {
        dial.start = s;
        return s;
      });
    }
  }

  function setGlowAmount() {
    const current = appContext?.current;
    if (current) {
      let mapped = mapNumberRange(current.speed, 1, 380, 0, 1);
      mapped = handleRangeBias(mapped, 0.5, "exp");
      return mapped;
    }
  }

  useEffect(function () {
    setDialPos(dial.value);
    const knob = knobRef.current;
    if (knob) {
      addGenericEventListener(knob, "mousedown", (e: MouseEvent) =>
        mouse.handleDown(e, knob)
      );
      addGenericEventListener(window, "mousemove", (e: MouseEvent) => {
        mouse.handleMove(e, knob, handleMouseMove);
      });
      addGenericEventListener(window, "mouseup", (e: MouseEvent) =>
        mouse.handleUp(e, knob, handleMouseUp)
      );
    }
  }, []);

  useEffect(
    function () {
      if (knobRef.current) {
        knobRef.current.style.transform = `rotate(${dialPos}deg)`;
      }
    },
    [dialPos]
  );

  return (
    <Component>
      <Knob theme={{ glowAmount: setGlowAmount() }}>
        <Background></Background>
        {/* <div className="Dial__knob__highlight"></div> */}
        <Canvas />
        <LineContainer ref={knobRef}>
          <Line theme={{ glowAmount: setGlowAmount() }}></Line>
        </LineContainer>
      </Knob>
      <Text>Speed</Text>
    </Component>
  );
}

// function moveKnob(mouse: MouseState, knobRef) {
//   currentValue = startingValue + mouse.y.distanceTravelled ;
//   if (currentValue < min) currentValue = min;
//   if (currentValue > max) currentValue = max;
//   currentValue = Math.floor(currentValue / step) * step;
//   currentValue = mapNumberRange(currentValue, min, max, 0, 1);
//   currentValue = handleRangeBias(currentValue, log, logType) as number;
//   // if (dbType === "db") currentValue = amplitudeToDecibels(currentValue);
// }

// export default function Dial() {
//   return <div>Dial</div>;
// }
