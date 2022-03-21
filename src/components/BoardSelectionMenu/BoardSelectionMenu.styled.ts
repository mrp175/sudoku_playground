import styled from "styled-components";
import {
  background_alt_color,
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
  background: rgba(${background_alt_color}, 0.6);
  backdrop-filter: blur(5px);
  transition: 0.5s;
  transition-timing-function: cubic-bezier(0.55, -0.01, 0, 1.08);
  ${(props) =>
    !props.theme.isOpen ? "transform: translateY(calc(100% - 44px))" : ""};
  border: 5px solid green;
`;

export const Text = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 40px;
  color: rgb(${primary_color});
  height: 0px;
  text-shadow: 0px 0px 2px rgb(${primary_color});
  cursor: pointer;
`;

export const Panel = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 44px 1fr;
  width: 100vw;
  aspect-ratio: 2 / 1;
  border-top: 5px solid red;
  max-height: calc(100vh - 100px);
`;
