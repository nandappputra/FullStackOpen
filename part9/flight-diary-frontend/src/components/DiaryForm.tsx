import { useState } from "react";
import { postNewDiary } from "../services/DiariesService";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "../types/DiaryEntry";
import { DiaryFormProps } from "../types/DiaryFormProps";
import { parseVisibility, parseWeather } from "../utils/DiaryUtils";

export function DiaryForm(diaryFormProps: DiaryFormProps): JSX.Element {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const createNewDiary = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    const newDiary: NewDiaryEntry = {
      date,
      weather: parseWeather(weather),
      visibility: parseVisibility(visibility),
      comment,
    };

    postNewDiary(newDiary).then((diaryEntry) => {
      const addedDiary: NonSensitiveDiaryEntry = {
        id: diaryEntry.id,
        date,
        weather: parseWeather(weather),
        visibility: parseVisibility(visibility),
      };

      diaryFormProps.addDiaryEntry(addedDiary);
    });
  };

  return (
    <form onSubmit={createNewDiary}>
      <div>
        <label>Date:</label>
        <input
          type="text"
          id="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>Weather:</label>
        <input
          type="text"
          id="weather"
          onChange={(event) => {
            setWeather(event.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>Visibility:</label>
        <input
          type="text"
          id="visibility"
          onChange={(event) => {
            setVisibility(event.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>Comment:</label>
        <input
          type="text"
          id="comment"
          onChange={(event) => {
            setComment(event.target.value);
          }}
        ></input>
      </div>

      <button type="submit">add</button>
    </form>
  );
}
