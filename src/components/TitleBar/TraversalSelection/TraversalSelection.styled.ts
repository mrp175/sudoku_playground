import styled from "styled-components";
import {
  background_alt_color,
  box_shadow,
  primary_color,
} from "../../../styleVars/styleVars";

export const Component = styled.div`
  display: grid;
  grid-template-columns: 1fr 2px auto;
  color: rgb(${primary_color});
  grid-gap: 2px;
  position: absolute;
  right: 25px;
  top: 0;
  margin: 0;
  height: 100%;
  align-items: center;
  transition: 0.3s ease;

  &.disabled {
    pointer-events: none;
    filter: grayscale(100%) brightness(50%);
  }
`;

export const Select = styled.select`
  font-size: 16px;
  color: rgb(${primary_color});
  margin: 10px;
  text-shadow: 0px 0px 2px rgb(${primary_color});
  background: none;
  border: none;
  width: 135px;
  outline: none;
  cursor: pointer;
  height: 100%;
`;

export const Option = styled.option`
  font-size: 16px;
  color: rgb(${primary_color});
  margin: 10px;
  background: rgb(${background_alt_color});
  cursor: pointer;
`;

export const Text = styled.div`
  font-size: 16px;
  color: rgb(${primary_color});
  margin: 10px;
  text-shadow: 0px 0px 2px rgb(${primary_color});
`;

export const DividingLine = styled.div`
  height: 50%;
  width: 2px;
  background: rgb(${primary_color});
`;
