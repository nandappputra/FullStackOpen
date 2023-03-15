import { PatientWithoutSSN } from "../types/PatientWithoutSSN";
import patients from "../data/patients";
import { v4 as uuidv4 } from "uuid";
import { NewPatient } from "../types/newPatient";
import { Patient } from "../types/Patient";

export function getAllPatientsWithoutSSN(): PatientWithoutSSN[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export function addPatient(newPatient: NewPatient): Patient {
  const patient: Patient = {
    id: uuidv4(),
    name: newPatient.name,
    dateOfBirth: newPatient.dateOfBirth,
    ssn: newPatient.ssn,
    gender: newPatient.gender,
    occupation: newPatient.occupation,
  };

  patients.push(patient);

  return patient;
}
