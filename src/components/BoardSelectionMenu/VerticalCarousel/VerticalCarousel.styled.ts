import styled from "styled-components";
import { border_radius, primary_color } from "../../../styleVars/styleVars";

export const Component = styled.div`
  display: grid;
  ${(props) =>
    props.theme.width > 750
      ? "grid-template-columns: 250px 1fr;"
      : "grid-template-rows: 250px 1fr"}
  height: 100vh;
`;

export const Panels = styled.div`
  box-sizing: border-box;
  display: grid;
  ${(props) =>
    props.theme.width > 750
      ? `
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  height: 500%;
  transform: translateY(${props.theme.position}%);
  `
      : `
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 500%;
  transform: translateX(${props.theme.position}%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 2%, black 15%);
  mask-image: linear-gradient(to bottom, transparent 2%, black 15%);
  `}

  transition: 0.5s ease;
`;

export const PanelsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ButtonSelection = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  ${(props) =>
    props.theme.width > 750
      ? `border-right: 2px solid rgb(${primary_color});
  width: 100%;
  `
      : `border-bottom: 2px solid rgb(${primary_color});
      width: 75%;
      height: 200px`}
`;

export const Button = styled.button`
  ${(props) => (props.theme.width > 750 ? "padding: 20px" : "")};
  font-size: 16px;
  font-weight: 500;
  color: rgb(${primary_color});
  text-shadow: 0px 0px 2px rgb(${primary_color});
  transition: 0.3s ease;
  border-radius: ${border_radius};
  border: 2px solid rgba(0, 0, 0, 0);
  background: none;
  &:hover {
    cursor: pointer;
    background: rgba(${primary_color}, 0.1);
  }

  &.selected {
    background: rgba(${primary_color}, 0.1);
  }
`;

export const SelectionContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
`;
