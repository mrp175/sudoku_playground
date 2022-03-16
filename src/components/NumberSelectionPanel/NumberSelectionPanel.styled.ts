import styled from "styled-components";
import {
  primary_color,
  border_radius,
  box_shadow,
  background_alt_color,
} from "../../styleVars/styleVars";
import { secondary_color } from "../../styleVars/styleVars";

export const Component = styled.div`
  background: rgba(${secondary_color}, 0.2);
  border-radius: ${border_radius};
  box-shadow: ${box_shadow};
  width: 100%;
  height: 100%;
  display: grid;
  ${(props) =>
    props.theme.orientation === "landscape"
      ? "grid-template-rows: repeat(9, 1fr)"
      : "grid-template-columns: repeat(9, 1fr)"};

  grid-gap: 2px;
  position: relative;
  /* overflow: hidden; */

  & > div {
    font-family: "Courier", Courier, monospace;
    width: 80px;
    height: 80px;
    font-weight: bold;
    font-size: 40px;
    background: rgb(${background_alt_color});
    border-radius: ${border_radius};
    display: grid;
    align-items: center;
    justify-items: center;
    align-content: center;
    color: white;
    text-shadow: 0px 0px 3px white;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                          supported by Chrome, Edge, Opera and Firefox */
    transition: 0.3s ease;
    &:hover {
      cursor: pointer;
      z-index: 1;
      background: rgb(${secondary_color});
      transition: 0.1s ease;
      box-shadow: 0px 0px 15px 0px rgba(${secondary_color}, 1);
    }

    &.selected {
      background: rgb(${secondary_color});
      transition: 0.1s ease;
      box-shadow: 0px 0px 15px 0px rgba(${secondary_color}, 1);
    }
  }
`;
