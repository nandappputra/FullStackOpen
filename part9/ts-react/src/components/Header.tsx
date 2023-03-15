import { HeaderProps } from "../types/HeaderProps";

export function Header(headerProps: HeaderProps): JSX.Element {
  return <h1>{headerProps.courseName}</h1>;
}
