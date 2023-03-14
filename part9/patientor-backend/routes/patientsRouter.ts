import Express from "express";
import { getAllPatientsWithoutSSN } from "../services/patientsService";

const router = Express.Router();

router.get("/", (_req, res) => {
  res.send(getAllPatientsWithoutSSN());
});

export default router;
