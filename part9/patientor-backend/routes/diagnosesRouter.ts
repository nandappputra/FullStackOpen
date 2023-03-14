import Express from "express";
import { getAllDiagnoses } from "../services/diagnosesService";

const router = Express.Router();

router.get("/", (_req, res) => {
  res.send(getAllDiagnoses());
});

export default router;
