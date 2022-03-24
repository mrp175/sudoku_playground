import styled from "styled-components";
import { title_bar_height } from "../../styleVars/styleVars";

export const ComponentWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Grid = styled.div`
  margin: auto;
  transform-origin: left top 0px;
  transform: scale(${(props) => props.theme.scale});
  -moz-transform: scale(${(props) => props.theme.scale});
  display: grid;
  ${(props) =>
    props.theme.orientation === "landscape" ? "width: 1366px;" : ""}
  ${(props) =>
    props.theme.orientation === "landscape"
      ? "grid-template-columns: auto auto auto; grid-gap: 75px;"
      : "grid-template-rows: auto auto auto; grid-gap: 25px;"};
`;

export const GridContainer = styled.div`
  overflow-x: hidden;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 20px;
  ${(props) => {
    if (props.theme.orientation === "landscape" && props.theme.scale < 1)
      return "padding-bottom: 0px;";
  }}
  height: calc(100vh - 88px);
`;

export const PreventHorizontalScroll = styled.div`
  ${(props) => {
    const { orientation, scale, dimensions } = props.theme;
    if (orientation === "portrait" && scale < 1) {
      return `height: ${dimensions.portrait.height * scale}px;`;
    } else if (orientation === "landscape" && scale < 1) {
      return `width: ${dimensions.landscape.width * scale + 40}px; height: ${
        dimensions.landscape.height * scale
      }px;
      overflow: hidden;
      margin-left: -20px;
      margin-top: -20px;
      padding: 20px;
      height: ${dimensions.landscape.height * scale + 40}px;`;
    } else if (orientation === "landscape") {
      return `overflow: hidden;
      margin-left: -20px;
      padding: 20px;`;
    }
  }}
`;

export const PreventVerticalScroll = styled.div`
  ${(props) => {
    const { orientation, scale, dimensions } = props.theme;
    if (orientation === "portrait" && scale < 1) {
      return `height: ${dimensions.portrait.height * scale + 40}px;
      overflow: hidden;
      padding: 20px;
      margin-left: -20px;
      margin-top: -20px;
  `;
    }
  }}
`;
