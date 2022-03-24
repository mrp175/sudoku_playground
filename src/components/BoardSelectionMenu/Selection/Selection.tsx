import { Component } from "./Selection.styled";

export default function Selection({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <Component>{children}</Component>;
}
