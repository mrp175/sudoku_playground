import Button from "@mui/material/Button";
import { primary_color } from "../styleVars/styleVars";

export default function DisableElevation({
  children,
  color,
}: {
  children: string;
  color: string;
}) {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        transition: "0.1s ease",
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
          filter: "brightness(130%)",
        },
      }}
    >
      {children}
    </Button>
  );
}
