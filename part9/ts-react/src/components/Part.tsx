import { PartProps } from "../types/PartProps";

export function Part(props: PartProps): JSX.Element {
  const coursePart = props.coursePart;

  switch (coursePart.kind) {
    case "background":
      return (
        <p>
          {coursePart.name}
          {coursePart.exerciseCount}
          {coursePart.backroundMaterial}
          {coursePart.description}
        </p>
      );
    case "basic":
      return (
        <p>
          {coursePart.name}
          {coursePart.exerciseCount}
          {coursePart.description}
        </p>
      );
    case "group":
      return (
        <p>
          {coursePart.name}
          {coursePart.exerciseCount}
          {coursePart.groupProjectCount}
        </p>
      );
    case "special":
      return (
        <p>
          {coursePart.name}
          {coursePart.exerciseCount}
          {coursePart.description}
          {coursePart.requirements}
        </p>
      );
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(coursePart)}`
      );
  }
}
