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
  width: 700px;
  height: ${prop("height")}px;
  margin: 20px;
`;

export const Input = styled.input`
  height: 100%;
  width: 100%;
  font-size: 200%;
  text-align: center;
  background: white;
  transition: 1.2s ease, transform 0.1s ease;
  border: none;
  border-radius: 3px;
`;
export const Canvas = styled.canvas`
  border: 1px solid black;
  margin: 0;
`;

export const Centered = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100vw;
  height: 100vh;
`;
