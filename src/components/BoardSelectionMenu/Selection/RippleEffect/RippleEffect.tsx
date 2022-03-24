import { Button } from "@mui/material";
import { primary_color } from "../../../../styleVars/styleVars";

export default function RippleEffect() {
  return (
    <Button
      sx={{
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        color: `rgb(${primary_color})`,
        border: `2px solid rgba(${primary_color}, 0)`,
        "&:hover": { border: `2px solid rgba(${primary_color}, 0.2)` },
      }}
    ></Button>
  );
}
