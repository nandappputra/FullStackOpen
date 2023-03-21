import { PatientWithoutSSN } from "../types/PatientWithoutSSN";
import patients from "../data/patients";
import { v4 as uuidv4 } from "uuid";
import { NewPatient } from "../types/newPatient";
import { Patient } from "../types/Patient";
import { Entry } from "../types/Entry";

export function getAllPatientsWithoutSSN(): PatientWithoutSSN[] {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
}

export function addPatient(newPatient: NewPatient): Patient {
  const patient: Patient = {
    id: uuidv4(),
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    ssn: newPatient.ssn,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
    entries: new Array<Entry>(),
  };

  patients.push(patient);

  return patient;
}

export function addPatientEntry(entry: Entry, id: string): Patient {
  const patient = patients.find((patient) => patient.id === id);

  if (patient) {
    if (patient.entries) {
      patient.entries.push(entry);
    } else {
      patient.entries = [entry];
    }

    return patient;
  }

  throw new Error("user not found");
}
