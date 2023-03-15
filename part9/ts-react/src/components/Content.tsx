import { ContentProps } from "../types/ContentProps";

export function Content(contentProps: ContentProps): JSX.Element {
  return (
    <>
      {contentProps.courses.map((course) => (
        <p>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
}
