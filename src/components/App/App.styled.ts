import styled from "styled-components";
import { title_bar_height } from "../../styleVars/styleVars";

export const ComponentWrapper = styled.div`
  height: 150vh;
  width: 150vw;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
`;

export const Grid = styled.div`
  display: grid;
  ${(props) =>
    props.theme.orientation === "landscape"
      ? "grid-template-columns: auto auto auto"
      : "grid-template-rows: auto auto auto"};
  grid-gap: 75px;
`;

export const GridContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 20px;
  height: calc(100vh - ${title_bar_height});
`;
