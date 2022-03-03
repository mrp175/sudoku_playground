import styled from "styled-components";

type Props = {
  theme: {
    [key: string]: string;
  };
};

function prop(name: string) {
  return function (props: Props) {
    return props.theme[name];
  };
}

export const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(9, 1fr);
  grid-template-columns: repeat(9, 1fr);
  max-width: 800px;
  height: ${prop("height")}px;
  border: 1px solid black;

  & > div {
    border: 1px solid green;
  }
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 200%;
  text-align: center;
`;
