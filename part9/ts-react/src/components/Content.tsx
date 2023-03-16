import { ContentProps } from "../types/ContentProps";
import { Part } from "./Part";

export function Content(contentProps: ContentProps): JSX.Element {
  return (
    <>
      {contentProps.courses.map((course) => (
        <Part coursePart={course} />
      ))}
    </>
  );
}
