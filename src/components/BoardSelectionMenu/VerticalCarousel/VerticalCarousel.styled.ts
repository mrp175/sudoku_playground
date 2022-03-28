import styled from "styled-components";
import { border_radius, primary_color } from "../../../styleVars/styleVars";

export const Component = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
`;

export const Panels = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  transition: 0.5s ease;
  height: 500%;
  transform: translateY(${(props) => props.theme.position}%);
`;

export const PanelsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ButtonSelection = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  border-right: 2px solid rgb(${primary_color});
`;

export const Button = styled.button`
  padding: 20px;
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
