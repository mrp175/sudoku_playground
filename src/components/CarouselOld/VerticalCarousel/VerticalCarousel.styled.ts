import styled from "styled-components";
import { primary_color } from "../../../styleVars/styleVars";

export const Container = styled.div`
  height: 100%;
  width: calc(100vw - 200px);
  border: 5px solid red;
  position: absolute;
  right: 0;
`;

export const Wrapper = styled.div`
  font-size: 16px;
  color: rgb(${primary_color});
  margin: 10px;
  text-shadow: 0px 0px 2px rgb(${primary_color});
  text-align: center;
`;
