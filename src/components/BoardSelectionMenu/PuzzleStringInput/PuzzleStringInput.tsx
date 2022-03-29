import { useContext, useState } from "react";
import { primary_color } from "../../../styleVars/styleVars";
import {
  Component,
  Buttons,
  TextArea,
  Button,
  ButtonContainer,
} from "./PuzzleStringInput.styled";
import { createFromPuzzleString } from "../../../utils/generatePresetBoards";
import { AppContext, boardContext } from "../../Providers/appContexts";
import { AppContextType, SetState, UseRefMutable } from "../../../types/types";
import RippleEffect from "../Selection/RippleEffect/RippleEffect";

export default function PuzzleStringInput({
  setIsOpen,
  gridWidth,
}: {
  setIsOpen: SetState<boolean>;
  gridWidth: number;
}) {
  const [text, setText] = useState("");
  const appContext = useContext(AppContext) as UseRefMutable<AppContextType>;
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      e.preventDefault();
      createFromPuzzleString(setIsOpen, appContext, boardContext, text);
    }
  }

  return (
    <Component>
      <TextArea
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleKeyDown(e)}
        theme={{ gridWidth }}
        placeholder="Enter a valid 81 character puzzle string consisting of digits 0-9 here to generate sudoku board."
      ></TextArea>
      <Buttons>
        <ButtonContainer
          onClick={() =>
            createFromPuzzleString(setIsOpen, appContext, boardContext, text)
          }
        >
          <RippleEffect />
          <Button>Generate</Button>
        </ButtonContainer>
        <ButtonContainer onClick={() => setText("")}>
          <Button>Clear Text</Button>
          <RippleEffect />
        </ButtonContainer>
      </Buttons>
    </Component>
  );
}
