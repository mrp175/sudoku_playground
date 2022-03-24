import styled from "styled-components";
import {
  background_alt_color,
  border_radius,
  box_shadow,
  primary_color,
  primary_color_alpha,
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
  cursor: pointer;
  position: relative;
`;

export const Canvas = styled.canvas`
  overflow: hidden;
  border-radius: 4px;
  background: rgb(${background_alt_color});
`;

export const BoxShadowHover = styled.div`
  opacity: 0;
  box-shadow: 0px 0px 5px 0px rgba(${primary_color}, ${primary_color_alpha});
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  transition: 0.2s ease;
  border-radius: 4px;

  &:hover {
    opacity: 1;
  }
`;
