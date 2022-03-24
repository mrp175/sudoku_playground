import { useEffect, useRef, useState } from "react";
import { Component, Panel, Text } from "./BoardSelectionMenu.styled";
import VerticalCarousel from "./VerticalCarousel/VerticalCarousel";
import Selection from "./Selection/Selection";
import { puzzleStrings } from "../../puzzleStrings/puzzelStrings";
import { Presets, PresetsRef } from "../../types/types";
import {
  createCanvasElements,
  createPresetBoard,
  convertPuzzleStringToIndexArray,
} from "../../utils/generatePresetBoards";

export default function BoardSelectionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [presets, setPresets] = useState<Presets>({});
  const presetsRef = useRef<PresetsRef>({});
  const difficulties = ["easy", "medium", "hard", "expert"];

  function handleClick() {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }

  useEffect(function () {
    for (let i = 0; i < puzzleStrings.length; i += 1) {
      createCanvasElements(
        puzzleStrings[i],
        difficulties[i],
        setPresets,
        presetsRef.current,
        setIsOpen
      );
    }
  }, []);

  useEffect(
    function () {
      for (let i = 0; i < puzzleStrings.length; i += 1) {
        const difficulty = difficulties[i];
        const current = presetsRef.current;
        for (let j = 0; j < current[difficulty].length; j += 1) {
          const indexArray = convertPuzzleStringToIndexArray(
            puzzleStrings[i][j]
          );
          const canvas = current[difficulty][j];
          canvas.height = 400;
          canvas.width = 400;
          const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
          createPresetBoard(canvas, ctx, 400, indexArray);
        }
      }
    },
    [presets]
  );

  return (
    <Component theme={{ isOpen }}>
      <Panel>
        <Text onClick={handleClick}>Select Board</Text>
        <VerticalCarousel>
          <Selection>
            <div></div>
          </Selection>
          <Selection>
            <>{presets.easy}</>
          </Selection>
          <Selection>
            <>{presets.medium}</>
          </Selection>
          <Selection>
            <>{presets.hard}</>
          </Selection>
          <Selection>
            <>{presets.expert}</>
          </Selection>
        </VerticalCarousel>
      </Panel>
    </Component>
  );
}
