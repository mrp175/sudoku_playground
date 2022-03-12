import { Btn } from "./Button.styled";

type ButtonParams = {
  children: string;
  color: string;
  backgroundColor: string;
  glowOnHover: boolean;
};

export default function Button({
  children,
  color,
  backgroundColor,
  glowOnHover,
}: ButtonParams) {
  return <Btn theme={{ color, backgroundColor, glowOnHover }}>{children}</Btn>;
}
