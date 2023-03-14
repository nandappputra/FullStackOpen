import diagnoses from "../data/diagnoses";
import { Diagnose } from "../types/Diagnose";

export function getAllDiagnoses(): Diagnose[] {
  return diagnoses;
}
