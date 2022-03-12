import styled from "styled-components";
import {
  background_alt_color,
  box_shadow,
  primary_color,
} from "../styleVars/styleVars";

export const Component = styled.div`
  background: rgb(${background_alt_color});
  box-shadow: ${box_shadow};
`;

export const Title = styled.div`
  font-size: 20px;
  margin: 10px 25px;
  color: rgb(${primary_color});
  font-weight: 500;
  text-shadow: 0px 0px 2px rgb(${primary_color});
`;
