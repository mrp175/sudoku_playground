import styled from "styled-components";
import {
  background_alt_color,
  border_radius,
  box_shadow,
  primary_color,
} from "../../styleVars/styleVars";

export const Component = styled.div`
  background: rgba(${primary_color}, 0.2);
  border-radius: ${border_radius};
  box-shadow: ${box_shadow};
  width: 100%;
  height: 100%;
  display: grid;
  ${(props) =>
    props.theme.orientation === "landscape"
      ? "grid-template-rows: 1fr 1fr 1fr"
      : "grid-template-columns: 1fr 1fr 1fr"};
  grid-gap: 2px;
  overflow: hidden;

  & > div {
    width: 400px;
    background: rgb(${background_alt_color});
    border-radius: 4px;
    display: grid;
    align-items: center;
    justify-items: center;
    align-content: center;

    &.portrait {
      width: 100%;
      height: 250px;
    }
  }
`;
