import React, { useRef, useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { Component } from "./NumberSelectionPanel.styled";

type GridRefs = React.MutableRefObject<HTMLDivElement[]>;

export default function NumberSelectionPanel() {
  const [selected, setSelected] = useState(0);
  const gridElementsRef = useRef<HTMLDivElement[]>([]);
  const [gridElements, setGridElements] = useState<JSX.Element[]>([]);
  const appContext = useContext(AppContext);

  function handleClick(e: React.MouseEvent, gridRefs: GridRefs) {
    const current = gridRefs.current;
    const element = e.target as HTMLElement;
    element.classList.add("selected");
    const currentlySelected = element.innerText;
    setSelected(function (state) {
      current[state].classList.remove("selected");
      const newState = +currentlySelected - 1;
      console.log(newState);
      return newState;
    });
  }

  function createGridElements(gridRefs: GridRefs) {
    const elements: JSX.Element[] = [];
    const current = gridRefs.current;
    let className = "selected";
    for (let i = 1; i <= 9; i += 1) {
      elements.push(
        <div
          className={i === 1 ? className : ""}
          key={"gridEl" + i}
          ref={(el) => current?.push(el!)}
          onClick={(e) => handleClick(e, gridRefs)}
        >
          {i}
        </div>
      );
    }
    return elements;
  }

  useEffect(
    function () {
      const current = appContext?.current;
      if (current) {
        current.selectedNumber = selected + 1;
      }
    },
    [selected]
  );

  useEffect(function () {
    if (gridElementsRef) {
      setGridElements(createGridElements(gridElementsRef));
    }
  }, []);

  return <Component>{gridElements}</Component>;
}
