import { Visibility, Weather } from "../types/DiaryEntry";

export function parseWeather(object: unknown): Weather {
  if (isString(object) && isWeather(object)) {
    return object;
  }

  throw new Error("invalid weather");
}

export function parseVisibility(object: unknown): Visibility {
  if (isString(object) && isVisibility(object)) {
    return object;
  }

  throw new Error("invalid visibility");
}

function isString(object: unknown): object is string {
  return typeof object === "string" || object instanceof String;
}

function isWeather(weather: string): weather is Weather {
  return Object.values(Weather)
    .map((entry) => entry.toString())
    .includes(weather);
}

function isVisibility(visibility: string): visibility is Visibility {
  return Object.values(Visibility)
    .map((entry) => entry.toString())
    .includes(visibility);
}
