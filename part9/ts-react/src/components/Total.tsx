import { TotalProps } from "../types/TotalProps";

export function Total(totalProps: TotalProps): JSX.Element {
  return (
    <p>
      Number of exercises{" "}
      {totalProps.courses.reduce(
        (carry, part) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
}
