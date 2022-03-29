import { Component, Title, TotalCount } from "./TitleBar.styled";
import TraversalSelection from "./TraversalSelection/TraversalSelction";
import { ScreenDimensionsContextType, UseRefMutable } from "../../types/types";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../Providers/appContexts";

export default function TitleBar({
  screenDimensions,
}: {
  screenDimensions: ScreenDimensionsContextType;
}) {
  const title = <Title>SUDOKU PLAYGROUND</Title>;
  const totalCountRef = useRef<HTMLDivElement>(null);
  const appContext = useContext(AppContext);

  function updateCountDisplay(
    appContextRef: typeof appContext,
    countRef: typeof totalCountRef
  ) {
    const div = countRef.current;
    const current = appContextRef?.current;
    if (current) {
      const { totalCount } = current;
      if (div) {
        div.innerHTML = "Total Operations: " + totalCount;
      }
    }
    setTimeout(function () {
      updateCountDisplay(appContextRef, totalCountRef);
    }, 1000 / 60);
  }

  useEffect(function () {
    updateCountDisplay(appContext, totalCountRef);
  }, []);

  return (
    <Component>
      {screenDimensions.width > 800 ? title : ""}
      {screenDimensions.width > 480 ? (
        <TotalCount
          ref={totalCountRef}
          theme={{ width: screenDimensions.width }}
        >
          Total Operations: 0
        </TotalCount>
      ) : (
        <div></div>
      )}
      <TraversalSelection />
    </Component>
  );
}
