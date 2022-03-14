import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { primary_color } from "../styleVars/styleVars";
import { AppContext } from "../App/App";
import { AppContextPropNames } from "../types/types";
import { handleRangeBias, mapNumberRange } from "../utils/utils";

function valueLabelFormat(value: number) {
  const units = ["KB", "MB", "GB", "TB"];

  let scaledValue = value;

  return `${scaledValue}`;
}

function calculateValue(
  value: number,
  bias: number,
  min: number,
  max: number,
  type: "exp" | "log"
) {
  const num = handleRangeBias(value, bias, type);
  const mapped = mapNumberRange(num, 0, 1, min, max);

  return Math.round((mapped + Number.EPSILON) * 1000) / 1000;
}

export default function NonLinearSlider({
  textLabel,
  appContextPropName,
  min,
  max,
  bias,
  expType,
}: {
  textLabel: string;
  appContextPropName: AppContextPropNames;
  min: number;
  max: number;
  bias: number;
  expType: "exp" | "log";
}) {
  const context = useContext(AppContext);
  const [value, setValue] = useState(10);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      const mappedValue = calculateValue(newValue, bias, min, max, expType);
      const current = context?.current;
      if (current) {
        current[appContextPropName] = mappedValue;
      }
    }
  };

  useEffect(function () {
    const current = context?.current;
    if (current) {
      setValue(0.5);
    }
  }, []);

  return (
    <Box sx={{ width: 250, margin: "15px" }}>
      <Slider
        sx={{
          color: `rgba(${primary_color}, 1)`,
        }}
        value={value}
        min={0}
        max={1}
        step={0.05}
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
