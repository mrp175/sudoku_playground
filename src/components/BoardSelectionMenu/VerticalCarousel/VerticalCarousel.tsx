import { useState, useRef, useMemo } from "react";
import {
  Component,
  Panels,
  ButtonSelection,
  SelectionContainer,
  Button,
  PanelsContainer,
} from "./VerticalCarousel.styled";

type ButtonsRef = HTMLButtonElement[];
type Buttons = JSX.Element[];

export default function VerticalCarousel({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [position, setPosition] = useState(0);
  const buttonsRef = useRef<ButtonsRef>([]);

  function createButtons(buttonsRef: ButtonsRef) {
    const buttonElements: Buttons = [];
    const difficulties = ["Custom", "Easy", "Medium", "Hard", "Expert"];
    for (let i = 0; i < difficulties.length; i += 1) {
      const button = (
        <Button
          key={"b" + i}
          onClick={() => handleClick(i)}
          ref={(el) => buttonsRef.push(el!)}
        >
          {difficulties[i]}
        </Button>
      );
      buttonElements.push(button);
    }
    return buttonElements;
  }

  function handleClick(selected: number) {
    const current = buttonsRef.current;
    setPosition((state) => {
      current[state].classList.remove("selected");
      current[selected].classList.add("selected");
      return selected;
    });
  }

  const buttons = useMemo(() => createButtons(buttonsRef.current), []);

  return (
    <Component>
      <SelectionContainer>
        <ButtonSelection>{buttons}</ButtonSelection>
      </SelectionContainer>
      <PanelsContainer>
        <Panels theme={{ position: -position * 20 }}>{children}</Panels>
      </PanelsContainer>
    </Component>
  );
}
