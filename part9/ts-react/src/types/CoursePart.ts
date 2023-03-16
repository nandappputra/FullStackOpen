interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourtParDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourtParDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CourtParDescription {
  backroundMaterial: string;
  kind: "background";
}

interface CoursePartRequirement extends CourtParDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartRequirement;
