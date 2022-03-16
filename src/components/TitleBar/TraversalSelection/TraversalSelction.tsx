import { useState, useContext, useEffect } from "react";
import {
  TraversalDirections,
  TraversalTextFields,
  StateSetState,
} from "../../../types/types";
import { AppContext, IsRunningContext } from "../../App/App";
import {
  Component,
  Option,
  Select,
  Text,
  DividingLine,
} from "./TraversalSelection.styled";
export default function TraversalSelection() {
  const [isRunning, setIsRunning] = useContext(
    IsRunningContext
  ) as StateSetState<boolean>;
  const traversalNameMap = {
    down: "down",
    right: "right",
    up: "up",
    left: "left",
    spiral: "spiral",
    "reverse spiral": "spiralReverse",
    "two horizontal": "twoHorizontal",
    "two vertical": "twoVertical",
    random: "random",
  };
  const appContext = useContext(AppContext);
  function handleChange(value: string) {
    const key = value.toLowerCase() as TraversalTextFields;
    const current = appContext?.current!;
    current.traversalDirection = traversalNameMap[key] as TraversalDirections;
  }

  return (
    <Component className={isRunning ? "disabled" : ""}>
      <Text>Traversal Type</Text>
      <DividingLine />
      <Select onChange={(e) => handleChange(e.target.value)}>
        <Option>Down</Option>
        <Option>Up</Option>
        <Option>Right</Option>
        <Option>Left</Option>
        <Option>Spiral</Option>
        <Option>Reverse Spiral</Option>
        <Option>Two Vertical</Option>
        <Option>Two Horizontal</Option>
        <Option>Random</Option>
      </Select>
    </Component>
  );
}
