import styled from "styled-components";

export const Component = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;

  & > div {
    border: 2px solid red;
  }
`;

export const Wrapper = styled.div``;

export const ButtonSelection = styled.div``;
