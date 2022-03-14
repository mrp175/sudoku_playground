import styled from "styled-components";
import { primary_color, border_radius } from "../../styleVars/styleVars";

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
  background: rgba(${primary_color}, 0.2);
  max-width: 736px;
  padding: 0;
  position: relative;
  align-items: center;
  justify-items: center;
`;

export const Canvas = styled.canvas`
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  margin: 0;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
  height: 80px;
  width: 80px;
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
  background: rgba(16, 32, 39);
  transition: 0.3s ease;
  &:hover {
    transition: 0.1s ease;
    z-index: 1;
    box-shadow: 0px 0px 15px 0px rgb(${primary_color});
  }
`;

export const BloomBoxShadow = styled.div`
  position: absolute;
  border-radius: 4px;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 15px 0px rgb(${primary_color});
  opacity: 0;
`;
