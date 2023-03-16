import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types/DiaryEntry";

const baseUrl = "http://localhost:3000/api/diaries";

export function getAllDiaries() {
  return axios
    .get<NonSensitiveDiaryEntry[]>(`${baseUrl}`)
    .then((response) => response.data);
}
