import styled from "styled-components";

export const Component = styled.div`
  box-shadow: ${(props) =>
    props.theme.isDisabled
      ? "none"
      : `inset 0px 0px 15px 0px rgba(${props.theme.color}, 0.1)`};
  padding: 0;
  border-radius: 2px;
  margin: 15px;
`;
