import { validateBmiCalculatorInput } from "./validator";

export function calculateBmiFromArguments(args: string[]): string {
  validateBmiCalculatorInput(args);

  const height = Number(args[2]);
  const weight = Number(args[3]);

  return calculateBmi(height, weight);
}

export function calculateBmi(heightInCm: number, massInKg: number): string {
  let bmi = massInKg / (((heightInCm / 100) * heightInCm) / 100);

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi <= 16.9) {
    return "Underweight (Moderate thinness)";
  } else if (bmi <= 18.4) {
    return "Underweight (Mild thinness)";
  } else if (bmi <= 24.9) {
    return "Normal range";
  } else if (bmi <= 29.9) {
    return "Overweight (Pre-obese)";
  } else if (bmi <= 34.9) {
    return "Obese (Class I)";
  } else if (bmi <= 39.9) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
}
