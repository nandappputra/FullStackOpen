import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (
    req.query.weight == null ||
    Number.isNaN(Number(req.query.weight)) ||
    req.query.height == null ||
    Number.isNaN(Number(req.query.height))
  ) {
    res.json({ error: "malformatted parameters" });
    res.end();
  }
  res.json({
    height: Number(req.query.height),
    weight: Number(req.query.weight),
    calculateBmi: calculateBmi(
      Number(req.query.height),
      Number(req.query.weight)
    ),
  });
});

app.post("/exercises", (req, res) => {
  const requestBody = req.body;

  if (requestBody.daily_exercises == null || requestBody.target == null) {
    res.json({ error: "parameter missing" });
  }

  if (
    !(requestBody.daily_exercises instanceof Array<Number>) ||
    Number.isNaN(Number(requestBody.target))
  ) {
    res.json({ error: "malformatted parameters" });
  }

  res.json(calculateExercise(requestBody.daily_exercises, requestBody.target));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
