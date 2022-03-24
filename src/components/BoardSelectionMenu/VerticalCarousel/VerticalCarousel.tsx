import {
  Component,
  Panels,
  ButtonSelection,
  SelectionContainer,
  Button,
  PanelsContainer,
} from "./VerticalCarousel.styled";
import { useState } from "react";

export default function VerticalCarousel({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [position, setPosition] = useState(0);
  return (
    <Component>
      <SelectionContainer>
        <ButtonSelection>
          <Button onClick={() => setPosition(0)}>Custom</Button>
          <Button onClick={() => setPosition(1)}>Easy</Button>
          <Button onClick={() => setPosition(2)}>Medium</Button>
          <Button onClick={() => setPosition(3)}>Hard</Button>
          <Button onClick={() => setPosition(4)}>Expert</Button>
        </ButtonSelection>
      </SelectionContainer>
      <PanelsContainer>
        <Panels theme={{ position: -position * 20 }}>{children}</Panels>
      </PanelsContainer>
    </Component>
  );
}
