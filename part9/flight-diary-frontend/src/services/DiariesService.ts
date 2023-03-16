import axios from "axios";
import {
  DiaryEntry,
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
} from "../types/DiaryEntry";

const baseUrl = "http://localhost:3000/api/diaries";

export function getAllDiaries() {
  return axios
    .get<NonSensitiveDiaryEntry[]>(`${baseUrl}`)
    .then((response) => response.data);
}

export function postNewDiary(newDiaryEntry: NewDiaryEntry) {
  return axios
    .post<DiaryEntry>(`${baseUrl}`, newDiaryEntry)
    .then((response) => response.data);
}
