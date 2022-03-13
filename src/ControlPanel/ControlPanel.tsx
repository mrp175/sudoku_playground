import { Component } from "./ControlPanel.styled";
import Slider from "../Slider/Slider";
import { primary_color, secondary_color } from "../styleVars/styleVars";
import Dial from "../Dial/Dial";
import MuiButton from "../MuiButton/MuiButton";

export default function ControlPanel() {
  return (
    <Component>
      <div>
        <MuiButton color={primary_color}>SOLVE BOARD</MuiButton>
        <MuiButton color={secondary_color}>RESET BOARD</MuiButton>
      </div>
      <div>
        <Dial
          min={0}
          max={100}
          step={1}
          init={50}
          log={0}
          logType="log"
          dbType="linear"
          waveformId="1"
        />
      </div>
      <div>
        <Slider textLabel={"Color Fade Speed"} />
        <Slider textLabel={"Text Fade Speed"} />
      </div>
    </Component>
  );
}
