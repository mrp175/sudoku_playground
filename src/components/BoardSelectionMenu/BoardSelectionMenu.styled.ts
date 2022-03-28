import styled from "styled-components";
import {
  background_alt_color,
  background_color,
  box_shadow,
  primary_color,
} from "../../styleVars/styleVars";

export const Component = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: ${box_shadow};
  z-index: 999;
  background: rgba(${background_color}, 0.9);
  backdrop-filter: blur(5px);
  transition: 0.8s;
  transition-timing-function: cubic-bezier(0.55, -0.01, 0, 1.08);
  ${(props) =>
    !props.theme.isOpen ? "transform: translateY(calc(100% - 44px))" : ""};
`;

export const Button = styled.div`
  text-align: center;
  font-size: 18px;
  line-height: 44px;
  color: rgb(${primary_color});
  height: 0px;
  text-shadow: 0px 0px 2px rgb(${primary_color});
  cursor: pointer;
  height: 44px;
  background: rgb(${background_alt_color});

  &.disabled {
    pointer-events: none;
    cursor: auto;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }
`;

export const Text = styled.div`
  transition: 0.3s ease;
  &.disabled {
    filter: grayscale(100%) brightness(50%);
  }
`;

export const Panel = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 44px 1fr;
  width: 100vw;
  height: 100vh;
`;
