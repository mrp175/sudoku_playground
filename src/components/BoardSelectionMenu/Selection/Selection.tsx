import { useContext, useEffect, useState } from "react";
import { ScreenDimensionsContext } from "../../Providers/appContexts";
import { Component } from "./Selection.styled";

export default function Selection({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const screenDimensions = useContext(ScreenDimensionsContext);
  const screenWidth = screenDimensions?.width;
  const [gridWidth, setGridWidth] = useState(400);

  useEffect(
    function () {
      if (screenWidth) {
        if (screenWidth > 450) setGridWidth(400);
        else setGridWidth(screenWidth - 50);
      }
    },
    [screenWidth]
  );
  return (
    <Component
      theme={{
        width: screenWidth,
        gridWidth: gridWidth,
      }}
    >
      {children}
    </Component>
  );
}
