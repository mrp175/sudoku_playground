import styled from "styled-components";
import { background_alt_color, box_shadow } from "../../../styleVars/styleVars";

export const Component = styled.div`
  width: calc(100vw - 250px);
  height: calc(100vh - 44px);
  overflow: hidden;
  display: grid;
  align-content: start;
  justify-content: space-evenly;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 25px;
  padding: 25px;
  overflow-y: scroll;

  & > div {
    height: 300px;
    width: 300px;
    background: rgb(${background_alt_color});
    border-radius: 4px;
    box-shadow: ${box_shadow};
  }
`;
