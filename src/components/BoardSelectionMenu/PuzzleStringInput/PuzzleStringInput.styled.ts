import styled from "styled-components";
import {
  background_alt_color,
  border_radius,
  primary_color,
  primary_color_alpha,
} from "../../../styleVars/styleVars";

export const Component = styled.div`
  height: 100%;
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const TextArea = styled.textarea`
  box-sizing: border-box;
  height: calc(100% - 50px);
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
  margin: 0;
`;

export const ButtonContainer = styled.div`
  position: relative;
`;
