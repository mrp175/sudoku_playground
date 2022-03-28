import { useState } from "react";
import { primary_color } from "../../../styleVars/styleVars";
import {
  Component,
  Buttons,
  TextArea,
  Button,
  ButtonContainer,
} from "./PuzzleStringInput.styled";
import { createFromPuzzleString } from "../../../utils/generatePresetBoards";
import { boardContext } from "../../Providers/appContexts";
import { SetState } from "../../../types/types";
import RippleEffect from "../Selection/RippleEffect/RippleEffect";

export default function PuzzleStringInput({
  setIsOpen,
  gridWidth,
}: {
  setIsOpen: SetState<boolean>;
  gridWidth: number;
}) {
  const [text, setText] = useState("");
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === "Enter") {
      e.preventDefault();
      createFromPuzzleString(setIsOpen, boardContext, text);
    }
  }

  return (
    <Component>
      <TextArea
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={(e) => handleKeyDown(e)}
        theme={{ gridWidth }}
      ></TextArea>
      <Buttons>
        <ButtonContainer
          onClick={() => createFromPuzzleString(setIsOpen, boardContext, text)}
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
