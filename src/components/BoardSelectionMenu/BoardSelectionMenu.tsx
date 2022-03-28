import { useContext, useEffect, useRef, useState } from "react";
import { Component, Panel, Button, Text } from "./BoardSelectionMenu.styled";
import VerticalCarousel from "./VerticalCarousel/VerticalCarousel";
import Selection from "./Selection/Selection";
import { puzzleStrings } from "../../puzzleStrings/puzzelStrings";
import {
  Difficulty,
  Presets,
  PresetsRef,
  StateSetState,
} from "../../types/types";
import {
  createCanvasElements,
  createPresetBoard,
  convertPuzzleStringToIndexArray,
} from "../../utils/generatePresetBoards";
import {
  AppContext,
  BoardContext,
  IsRunningContext,
  ScreenDimensionsContext,
} from "../Providers/appContexts";
import PuzzleStringInput from "./PuzzleStringInput/PuzzleStringInput";

export default function BoardSelectionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [presets, setPresets] = useState<Presets>({});
  const boardContextRef = useContext(BoardContext);
  const screenDimensions = useContext(ScreenDimensionsContext);
  const appContextRef = useContext(AppContext);
  const presetsRef = useRef<PresetsRef>({});
  const difficulties: Difficulty[] = [
    "custom",
    "easy",
    "medium",
    "hard",
    "expert",
  ];
  const [isRunning] = useContext(IsRunningContext) as StateSetState<boolean>;

  function handleClick() {
    if (isRunning) return;
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }

  useEffect(
    function () {
      let width = 400;
      if (screenDimensions && screenDimensions.width < 450) {
        width = screenDimensions.width - 50;
      }
      for (let i = 0; i < puzzleStrings.length; i += 1) {
        createCanvasElements(
          puzzleStrings[i],
          difficulties[i],
          setPresets,
          presetsRef.current,
          setIsOpen,
          appContextRef?.current!,
          boardContextRef?.current!,
          width
        );
      }
    },
    [screenDimensions?.width]
  );

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
          let gridWidth = 400;
          const width = screenDimensions?.width;
          if (width && width <= 450) {
            gridWidth = width - 50;
            canvas.width = width - 50;
            canvas.height = width - 50;
          }
          const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
          createPresetBoard(canvas, ctx, gridWidth, indexArray);
        }
      }
    },
    [presets, screenDimensions?.width]
  );

  useEffect(
    function () {
      if (appContextRef && appContextRef.current) {
        const current = appContextRef.current;
        current.isMenuOpen = isOpen;
      }
    },
    [isOpen]
  );

  return (
    <Component theme={{ isOpen }}>
      <Panel>
        <Button onClick={handleClick} className={isRunning ? "disabled" : ""}>
          <Text className={isRunning ? "disabled" : ""}>Select Board</Text>
        </Button>
        <VerticalCarousel>
          <Selection>
            <>
              {presets.custom}
              <PuzzleStringInput
                setIsOpen={setIsOpen}
                gridWidth={screenDimensions?.width!}
              ></PuzzleStringInput>
            </>
          </Selection>
          <Selection>{presets.easy}</Selection>
          <Selection>{presets.medium}</Selection>
          <Selection>{presets.hard}</Selection>
          <Selection>{presets.expert}</Selection>
        </VerticalCarousel>
      </Panel>
    </Component>
  );
}
