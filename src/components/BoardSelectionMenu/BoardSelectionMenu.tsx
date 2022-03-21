import { useState } from "react";
import { Component, Panel, Text } from "./BoardSelectionMenu.styled";
import VerticalCarousel from "./VerticalCarousel/VerticalCarousel";

export default function BoardSelectionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClick() {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  }
  return (
    <Component theme={{ isOpen }}>
      <Panel>
        <Text onClick={handleClick}>Select Board</Text>
        <VerticalCarousel />
      </Panel>
    </Component>
  );
}