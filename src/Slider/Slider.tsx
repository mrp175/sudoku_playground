import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { primary_color } from "../styleVars/styleVars";

function valueLabelFormat(value: number) {
  const units = ["KB", "MB", "GB", "TB"];

  let scaledValue = value;

  return `${scaledValue}`;
}

function calculateValue(value: number) {
  return 2 ** value;
}

export default function NonLinearSlider({ textLabel }: { textLabel: string }) {
  const [value, setValue] = useState(10);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 250, margin: "15px" }}>
      <Slider
        sx={{
          color: `rgba(${primary_color}, 0.8)`,
        }}
        value={value}
        min={1}
        step={1}
        max={60}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        aria-labelledby="non-linear-slider"
      />
      <Typography
        id="non-linear-slider"
        gutterBottom
        sx={{
          textAlign: "center",
          color: `rgb(${primary_color})`,
          textShadow: `0px 0px 2px rgb(${primary_color})`,
        }}
      >
        {textLabel}
      </Typography>
    </Box>
  );
}
