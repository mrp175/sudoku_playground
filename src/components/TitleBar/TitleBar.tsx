import { Component, Title } from "./TitleBar.styled";
import Button from "../Button/Button";
import {
  primary_color,
  background_alt_color,
  secondary_color,
} from "../../styleVars/styleVars";
import TraversalSelection from "./TraversalSelection/TraversalSelction";

export default function TitleBar() {
  return (
    <Component>
      <Title>SUDOKU PLAYGROUND</Title>
      <TraversalSelection />
    </Component>
  );
}
