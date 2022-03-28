import styled from "styled-components";
import {
  background_alt_color,
  border_radius,
  box_shadow,
  primary_color,
  primary_color_alpha,
} from "../../../styleVars/styleVars";

export const Component = styled.div`
  height: 100%;
  max-height: 400px;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

export const TextArea = styled.textarea`
  box-sizing: border-box;
  height: ${(props) => props.theme.gridWidth - 50}px;
  max-height: 200px;
  width: 100%;
  margin: 0;
  resize: none;
  background: rgb(${background_alt_color});
  border: none;
  color: rgb(${primary_color});
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border-radius: ${border_radius};
  box-shadow: ${box_shadow};
  margin-bottom: 10px;
  &:focus {
    outline: 2px solid rgba(${primary_color}, ${primary_color_alpha});
  }
`;

export const Button = styled.button`
  height: 46px;
  width: 100%;
  font-size: 16px;
  color: rgb(${primary_color});
  font-weight: 600;
  background: rgb(${background_alt_color});
  outline: none;
  border: none;
  border-radius: ${border_radius};
  margin: auto;
  box-shadow: ${box_shadow};
`;

export const ButtonContainer = styled.div`
  position: relative;
`;
