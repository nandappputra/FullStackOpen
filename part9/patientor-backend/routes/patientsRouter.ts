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

router.post("/", (req, res) => {
  console.log(req);
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
