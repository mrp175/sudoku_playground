import { Component, Title } from "./TitleBar.styled";
import TraversalSelection from "./TraversalSelection/TraversalSelction";
import { ScreenDimensionsContextType } from "../../types/types";

export default function TitleBar({
  screenDimensions,
}: {
  screenDimensions: ScreenDimensionsContextType;
}) {
  const title = <Title>SUDOKU PLAYGROUND</Title>;

  return (
    <Component>
      {screenDimensions.width > 600 ? title : ""}
      <TraversalSelection />
    </Component>
  );
}
