import styled from "styled-components";
import {
  background_alt_color,
  border_radius,
  box_shadow,
} from "../../../styleVars/styleVars";

export const Component = styled.div`
  width: calc(100vw - 250px);
  height: calc(100vh - 44px);
  overflow: hidden;
  display: grid;
  align-content: start;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, 400px);
  grid-gap: 50px;
  padding: 25px;
  overflow-y: scroll;
  /* -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%); */

  & > div {
    height: 400px;
    width: 400px;
    border-radius: 4px;
    box-shadow: ${box_shadow};
  }
`;

export const CanvasContainer = styled.div`
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  overflow: hidden;
  border-radius: 4px;
`;
