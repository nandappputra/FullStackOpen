import { PatientWithoutSSN } from "../types/PatientWithoutSSN";
import patients from "../data/patients";

export function getAllPatientsWithoutSSN(): PatientWithoutSSN[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}
