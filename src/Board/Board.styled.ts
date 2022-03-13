import styled from "styled-components";
import { border_radius, primary_color } from "../styleVars/styleVars";

type Props = {
  theme: {
    [key: string]: string;
  };
};

function prop(name: string) {
  return function (props: Props) {
    return props.theme[name];
  };
}

export const BoardGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
  /* width: 700px; */
  height: ${prop("height")}px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
  border-radius: ${border_radius};
  grid-gap: 2px;
  overflow: hidden;
  background: rgba(${primary_color}, 0.2);
  max-width: 736px;
  padding: 0;
`;

export const Canvas = styled.canvas`
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
`;

export const Centered = styled.div`
  align-items: center;
  justify-items: center;
  padding: 0;
`;

export const Cell = styled.div`
  align-self: center;
  justify-self: center;
  position: relative;
  height: 80px;
  width: 80px;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 4px;
  overflow: hidden;
  background: rgba(16, 32, 39);
`;
