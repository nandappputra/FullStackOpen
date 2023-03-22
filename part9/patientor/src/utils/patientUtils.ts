import { Entry, HealthCheckEntry } from "../types";

export const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
  return (entry as HealthCheckEntry).healthCheckRating !== undefined;
};

export const toStringArray = (data: string | string[]): string[] => {
  if (typeof data === "string") {
    return [data];
  }

  return data;
};
