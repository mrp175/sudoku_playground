import Button from "../../Button/Button";
import {
  primary_color,
  background_alt_color,
  secondary_color,
} from "../../styleVars/styleVars";
import { Component } from "./PlayPause.styled";
import { useContext } from "react";
import { AppContext } from "../../App/App";
import { AppContextType } from "../../types/types";

export default function PlayPause() {
  const contextRef = useContext(AppContext);
  // function play(context: AppContextType) {
  //   if (context.isRunning) {
  //     context.isRunning = false;
  //   }
  // }
  // function pause() {}
  return (
    <Component>
      <Button
        color={primary_color}
        backgroundColor={background_alt_color}
        glowOnHover={false}
      >
        SOLVE
      </Button>
      <Button
        color={secondary_color}
        backgroundColor={background_alt_color}
        glowOnHover={false}
      >
        RESET
      </Button>
    </Component>
  );
}
