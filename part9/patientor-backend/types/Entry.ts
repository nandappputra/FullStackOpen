export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface OccupationalHealthcareEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  employerName: string;
  diagnosisCodes?: Array<string>;
  description: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  diagnosisCodes: Array<string>;
  description: string;
  discharge: Discharge;
}

export interface HealthCheckEntry {
  id: string;
  date: string;
  specialist: string;
  type: string;
  description: string;
  healthCheckRating: number;
}
