import Express from "express";
import {
  getAllPatientsWithoutSSN,
  addPatient,
  addPatientEntry,
} from "../services/patientsService";
import { toEntry, toPatientEntry } from "../utils/patientsUtil";

const router = Express.Router();

router.get("/", (_req, res) => {
  res.send(getAllPatientsWithoutSSN());
});

router.get("/:id", (req, res) => {
  res.send(
    getAllPatientsWithoutSSN().find((patient) => patient.id === req.params.id)
  );
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toEntry(req.body);
    const updatedPatient = addPatientEntry(newEntry, req.params.id);
    res.json(updatedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400);
      res.send(error.message);
    }
    res.status(400);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toPatientEntry(req.body);
    const addedEntry = addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    console.log(error);
    res.status(400);
  }
});

export default router;
