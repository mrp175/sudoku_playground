import Button from "@mui/material/Button";
import { primary_color } from "../styleVars/styleVars";

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
  return (
    <Button
      disabled={isDisabled}
      onClick={onClick}
      variant="contained"
      disableElevation
      sx={{
        transition: "0.3s ease",
        margin: "15px",
        width: 250,
        fontWeight: "900",
        fontSize: "16px",
        padding: "20px",
        background: `none`,
        border: `2px solid rgba(${color}, 0.2)`,
        color: `rgb(${color})`,
        textShadow: `0px 0px 2px rgba(${color}, 1)`,
        "&:hover": {
          background: `rgba(${color}, 0.05)`,
          filter: "brightness(120%)",
        },
        "&:disabled": {
          filter: "grayscale(70%)",
          textShadow: `none`,
          color: `rgb(${color})`,
        },
      }}
    >
      {children}
    </Button>
  );
}
