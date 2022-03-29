import styled from "styled-components";
import {
  background_alt_color,
  box_shadow,
  primary_color,
  title_bar,
} from "../../styleVars/styleVars";

export const Component = styled.div`
  display: grid;
  grid-template-columns: 250px auto 250px;
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

export const TotalCount = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  color: rgb(${primary_color});
  text-align: ${(props) => (props.theme.width > 800 ? "center" : "left")};
  text-shadow: 0px 0px 2px rgb(${primary_color});
`;
