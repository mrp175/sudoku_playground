import styled from "styled-components";
import { box_shadow, font_family } from "../../styleVars/styleVars";

export const Btn = styled.button`
  outline: none;
  width: 250px;
  border-radius: 25px;
  /* box-shadow: ${box_shadow}; */
  border: none;
  font-family: ${font_family};
  font-size: 25px;
  padding: 8px;
  padding-top: 12px;
  font-weight: 900;
  background: rgb(${(props) => props.theme.backgroundColor});
  margin: 20px;
  transition: 0.1s ease;
  color: rgb(${(props) => props.theme.color});
  text-shadow: 0px 0px 2px rgba(${(props) => props.theme.color}, 0.6);
  border: 2px solid rgba(${(props) => props.theme.color}, 0.4);

  &:hover {
    cursor: pointer;
    ${(props) =>
      props.theme.glowOnHover
        ? `background: rgb(${props.theme.color})`
        : "filter: brightness(120%)"};
    ${(props) =>
      props.theme.glowOnHover ? "color: white" : `color: ${props.theme.color}`};
    text-shadow: 0px 0px 3px;
    /* ${(props) =>
      props.theme.glowOnHover ? "white" : `rgb${props.theme.color}`};
    box-shadow: 0px 0px 15px 0px rgba(${(props) => props.theme.color}, 0.4); */
  }
`;
