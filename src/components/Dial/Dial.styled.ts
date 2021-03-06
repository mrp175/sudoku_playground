import styled from "styled-components";
import {
  background_color,
  box_shadow,
  primary_color,
} from "../../styleVars/styleVars";

export const Component = styled.div`
  font-size: 5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  touch-action: none;
`;

export const Knob = styled.div`
  height: 2em;
  width: 2em;
  border-radius: 50%;
  display: grid;
  justify-items: center;
  overflow: hidden;
  position: relative;
  border: 2px solid rgba(${primary_color}, 0.2);
  box-shadow: 0px 0px 15px 0px
    hsla(162, 73%, ${(props) => Math.floor(props.theme.glowAmount * 10)}%, 0.4);
  box-shadow: ${box_shadow};
  transition: 0.1s ease;
  &:hover {
    background: rgba(${primary_color}, 0.05);
    cursor: pointer;
  }
`;

export const Background = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

export const Line = styled.div`
  position: absolute;
  height: 1em;
  width: 0;
  left: calc(50% - 2px);
  border: 2px solid
    rgba(${primary_color}, ${(props) => props.theme.glowAmount / 2 + 0.8});
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  box-shadow: 0px 0px 30px 2px
    rgba(${primary_color}, ${(props) => props.theme.glowAmount / 2 + 0.4});
`;

export const Canvas = styled.canvas``;

export const LineContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const Text = styled.div`
  font-size: 16px;
  color: rgb(${primary_color});
  margin: 10px;
  text-shadow: 0px 0px 2px rgb(${primary_color});
`;
