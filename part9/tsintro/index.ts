import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
