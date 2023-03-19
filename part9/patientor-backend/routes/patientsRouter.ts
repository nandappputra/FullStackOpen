import Express from "express";
import {
  getAllPatientsWithoutSSN,
  addPatient,
} from "../services/patientsService";
import { toPatientEntry } from "../utils/patientsUtil";

const router = Express.Router();

router.get("/", (_req, res) => {
  res.send(getAllPatientsWithoutSSN());
});

router.get("/:id", (req, res) => {
  res.send(
    getAllPatientsWithoutSSN().find((patient) => patient.id === req.params.id)
  );
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
