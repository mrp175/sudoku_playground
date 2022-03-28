import styled from "styled-components";
import {
  background_alt_color,
  border_radius,
  box_shadow,
  primary_color,
  primary_color_alpha,
} from "../../../styleVars/styleVars";

export const Component = styled.div`
  ${(props) =>
    props.theme.width > 750
      ? `
        width: calc(100vw - 240px);
        height: calc(100vh - 44px);
        padding: 25px;

      `
      : `
        width: calc(100vw);
        height: calc(100vh - 244px);
        padding: 25px;
        padding-top: 75px;
  `};
  overflow: hidden;
  display: grid;
  align-content: start;
  justify-content: space-evenly;
  grid-template-columns: repeat(
    auto-fill,
    ${(props) => props.theme.gridWidth}px
  );
  grid-gap: 50px;
  overflow-y: scroll;
`;

export const CanvasContainer = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  box-shadow: ${box_shadow};
  height: ${(props) => props.theme.gridWidth}px;
  width: ${(props) => props.theme.gridWidth}px;
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

export const PresetText = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: rgb(${primary_color});
`;
