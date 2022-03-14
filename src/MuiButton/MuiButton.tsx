import Button from "@mui/material/Button";
import { box_shadow, primary_color } from "../styleVars/styleVars";
import { Component } from "./MuiButton.styled";

export default function DisableElevation({
  children,
  color,
  onClick,
  isDisabled,
}: {
  children: string;
  color: string;
  onClick: () => void;
  isDisabled: boolean;
}) {
  console.log(color);
  return (
    <Component theme={{ color, isDisabled }}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        variant="contained"
        disableElevation
        sx={{
          margin: 0,
          transition: "0.2s ease",
          width: 250,
          fontWeight: "900",
          fontSize: "16px",
          padding: "20px",
          background: `none`,
          border: `2px solid rgba(${color}, 0.2)`,
          color: `rgb(${color})`,
          textShadow: `0px 0px 2px rgba(${color}, 1)`,
          boxShadow: `${box_shadow}`,
          "&.MuiSlider-thumb:hover": {
            color: "red",
            boxShadow: "0 0 0 10px rgba(0, 255, 0, 0.3) !important;",
          },
          "&:hover": {
            background: `rgba(${color}, 0.05)`,
            filter: "brightness(120%)",
            boxShadow: `${box_shadow}`,
          },
          "&:disabled": {
            filter: "grayscale(100%)",
            textShadow: `none`,
            color: `rgb(${color})`,
          },
        }}
      >
        {children}
      </Button>
    </Component>
  );
}
