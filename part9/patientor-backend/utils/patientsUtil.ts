import {
  Discharge,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
} from "../types/Entry";
import { Gender } from "../types/Gender";
import { NewPatient } from "../types/newPatient";
import { Diagnose } from "../types/Diagnose";

export function toPatientEntry(message: unknown): NewPatient {
  if (!message || typeof message !== "object") {
    throw new Error("missing or invalid message");
  }

  if (
    "name" in message &&
    "dateOfBirth" in message &&
    "ssn" in message &&
    "gender" in message &&
    "occupation" in message
  ) {
    const newPatient: NewPatient = {
      name: parseName(message.name),
      dateOfBirth: parseDate(message.dateOfBirth),
      ssn: parseSSN(message.ssn),
      gender: parseGender(message.gender),
      occupation: parseOccupation(message.occupation),
      entries: new Array<Entry>(),
    };

    return newPatient;
  }

  throw new Error("missing one of the required fields!");
}

export function toEntry(object: unknown): Entry {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("missing type field");
  }

  switch (object.type) {
    case "Hospital":
      return toHospitalEntry(object);
    case "OccupationalHealthcare":
      return toOccupationalHealthcareEntry(object);
    case "HealthCheck":
      return toHealthCheckEntry(object);
    default:
      throw new Error("unknown type");
  }
}

function toDiagnosisCodes(object: unknown): Array<Diagnose["code"]> {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
}

function toHospitalEntry(object: object): HospitalEntry {
  if (
    "id" in object &&
    "date" in object &&
    "type" in object &&
    "specialist" in object &&
    "diagnosisCode" in object &&
    "description" in object &&
    "discharge" in object
  ) {
    return {
      id: parseString(object.id),
      date: parseDate(object.date),
      type: parseString(object.type),
      specialist: parseString(object.specialist),
      diagnosisCodes: toDiagnosisCodes(object),
      description: parseString(object.description),
      discharge: parseDischarge(object.discharge),
    };
  }

  throw new Error("incomplete fields for hospital entry");
}

function toOccupationalHealthcareEntry(
  object: object
): OccupationalHealthcareEntry {
  if (
    "id" in object &&
    "date" in object &&
    "type" in object &&
    "specialist" in object &&
    "employerName" in object &&
    "description" in object
  ) {
    const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
      id: parseString(object.id),
      date: parseDate(object.date),
      type: parseString(object.type),
      employerName: parseString(object.employerName),
      specialist: parseString(object.specialist),
      diagnosisCodes: toDiagnosisCodes(object),
      description: parseString(object.description),
    };

    if ("diagnosisCodes" in object) {
      occupationalHealthcareEntry.diagnosisCodes = toDiagnosisCodes(
        object.diagnosisCodes
      );
    }

    if ("sickLeave" in object) {
      occupationalHealthcareEntry.sickLeave = parseSickLeave(object.sickLeave);
    }

    return occupationalHealthcareEntry;
  }

  throw new Error("incomplete fields for hospital entry");
}

function toHealthCheckEntry(object: object): HealthCheckEntry {
  if (
    "id" in object &&
    "date" in object &&
    "type" in object &&
    "specialist" in object &&
    "description" in object &&
    "healthCheckRating" in object
  ) {
    return {
      id: parseString(object.id),
      date: parseDate(object.date),
      type: parseString(object.type),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      healthCheckRating: parseNumber(object.healthCheckRating),
    };
  }

  throw new Error("incomplete fields for hospital entry");
}

function parseString(field: unknown): string {
  if (isString(field)) {
    return field;
  }

  throw new Error("invalid string");
}

function parseNumber(field: unknown): number {
  if (isNumber(field)) {
    return field;
  }

  throw new Error("invalid number");
}

function parseDischarge(object: unknown): Discharge {
  if (!object || typeof object !== "object") {
    throw new Error("invalid discharge");
  }

  if ("date" in object && "criteria" in object) {
    return {
      date: parseDate(object.date),
      criteria: parseString(object.criteria),
    };
  }

  throw new Error("missing field in discharge");
}

function parseSickLeave(object: unknown): SickLeave {
  if (!object || typeof object !== "object") {
    throw new Error("invalid sickLeave");
  }

  if ("startDate" in object && "endDate" in object) {
    return {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
  }

  throw new Error("missing field in sick leave");
}

function parseName(name: unknown): string {
  if (isString(name)) {
    return name;
  }

  throw new Error("invalid name");
}

function parseDate(date: unknown): string {
  if (isString(date) && isDate(date)) {
    return date;
  }

  throw new Error("invalid date");
}

function parseSSN(ssn: unknown): string {
  if (isString(ssn)) {
    return ssn;
  }

  throw new Error("invalid ssn");
}

function parseGender(gender: unknown): Gender {
  if (isString(gender) && isGender(gender)) {
    return gender;
  }

  throw new Error("invalid gender");
}

function parseOccupation(occupation: unknown): string {
  if (isString(occupation)) {
    return occupation;
  }

  throw new Error("invalid occupation");
}

function isString(object: unknown): object is string {
  return typeof object === "string" || object instanceof String;
}

function isDate(object: string): boolean {
  return Boolean(Date.parse(object));
}

function isNumber(object: unknown): object is number {
  return typeof object === "number" || object instanceof Number;
}

function isGender(object: string): object is Gender {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(object);
}
