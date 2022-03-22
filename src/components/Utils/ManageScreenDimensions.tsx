import { useEffect } from "react";
import { gridAspectRatio, padding } from "../../styleVars/styleVars";
import { SetState, UseRef } from "../../types/types";
import { getOrientation } from "../../utils/handleResize";

type ScreenDimensions = {
  width: number;
  height: number;
};
type Inputs = {
  screenDimensions: ScreenDimensions;
  setScreenDimensions: SetState<ScreenDimensions>;
  orientation: string;
  setOrientation: SetState<string>;
  appWrapperRef: UseRef<HTMLDivElement>;
  setScale: SetState<number>;
};

export default function ManageScreenDimensions({
  screenDimensions,
  setScreenDimensions,
  orientation,
  setOrientation,
  appWrapperRef,
  setScale,
}: Inputs) {
  useEffect(() => {
    const current = appWrapperRef.current;
    if (current) {
      setScreenDimensions({
        width: current.clientWidth,
        height: current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const current = appWrapperRef.current;
      if (current) {
        setScreenDimensions({
          width: current.clientWidth,
          height: current.clientHeight,
        });
      }
    });
  }, []);

  useEffect(() => {
    let currentOrientation = "landscape";
    if (window.innerWidth < 1430 || window.innerHeight < 830) {
      currentOrientation = getOrientation(
        screenDimensions.width,
        screenDimensions.height,
        gridAspectRatio
      );
    }
    setOrientation(currentOrientation);
  }, [screenDimensions]);

  useEffect(() => {
    let scale = 1;
    if (
      orientation === "portrait" &&
      screenDimensions.width < 738 + padding * 2
    ) {
      scale = (screenDimensions.width - padding * 2) / 738;
    } else if (
      orientation === "landscape" &&
      screenDimensions.height < 736 + padding * 2
    ) {
      scale = (screenDimensions.height - padding * 2) / 736;
    }
    setScale(scale);
  }, [screenDimensions, orientation]);
  return <></>;
}
