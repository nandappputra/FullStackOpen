export function validateBmiCalculatorInput(args: string[]) {
  if (args.length != 4) {
    throw "wrong number of argument";
  }

  if (Number.isNaN(Number(args[2])) || Number.isNaN(Number(args[3]))) {
    throw "invalid argument type";
  }
}

export function validateExerciseCalculatorInput(args: string[]) {
  args.map((arg, idx) => {
    if (idx != 0 && idx != 1 && Number.isNaN(Number(arg))) {
      throw "invalid argument type";
    }
  });

  if (Number(args[0]) > 3 || Number(args[0]) < 1) {
    throw "invalid target";
  }
}
