import { NonSensitiveDiaryEntry } from "./DiaryEntry";

export interface DiaryFormProps {
  addDiaryEntry(diaryEntry: NonSensitiveDiaryEntry): void;
}
