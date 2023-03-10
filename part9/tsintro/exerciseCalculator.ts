interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercise(dailyExercises: number[], target: number): Result {
  let average =
    dailyExercises.reduce((prev, current) => prev + current) /
    dailyExercises.length;

  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((x) => x > 0).length,
    target: target,
    average: average,
    success: average * 3 > target,
    rating: Math.ceil(average),
    ratingDescription:
      Math.ceil(average) == 1
        ? "lets do better next week!"
        : Math.ceil(average) == 2
        ? "not bad but could be better"
        : "great job!",
  };
}

console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
