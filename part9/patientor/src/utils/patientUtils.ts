import { Entry, HealthCheckEntry } from "../types";

export const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
  return (entry as HealthCheckEntry).healthCheckRating !== undefined;
};
