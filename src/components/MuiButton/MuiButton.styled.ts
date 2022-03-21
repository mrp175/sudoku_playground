import styled from "styled-components";

export const Component = styled.div`
  box-shadow: inset 0px 0px 15px 0px rgba(${(props) => props.theme.color}, 0.1);
  ${(props) =>
    props.theme.isDisabled
      ? `
box-shadow: none;
filter: brightness(50%);
`
      : ``}
  padding: 0;
  border-radius: 2px;
  margin: 15px;
  transition: 0.3s ease;
`;
