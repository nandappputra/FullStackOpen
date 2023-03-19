import { Entry } from "../types/Entry";
import { Gender } from "../types/Gender";
import { NewPatient } from "../types/newPatient";

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

function isGender(object: string): object is Gender {
  return Object.values(Gender)
    .map((gender) => gender.toString())
    .includes(object);
}
