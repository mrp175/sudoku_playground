import styled from "styled-components";
import {
  background_alt_color,
  box_shadow,
  primary_color,
  title_bar,
} from "../../styleVars/styleVars";

export const Component = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  background: rgb(${background_alt_color});
  box-shadow: ${box_shadow};
  padding: ${title_bar.padding}px 25px;
  position: relative;
  height: 44px;
`;

export const Title = styled.div`
  font-size: ${title_bar.font_size}px;
  color: rgb(${primary_color});
  font-weight: 900;
  text-shadow: 0px 0px 2px rgb(${primary_color});
  height: 44px;
`;
