import { useState } from "react";
import { postNewDiary } from "../services/DiariesService";
import {
  NewDiaryEntry,
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
} from "../types/DiaryEntry";
import { DiaryFormProps } from "../types/DiaryFormProps";
import { parseVisibility, parseWeather } from "../utils/DiaryUtils";
import axios from "axios";

export function DiaryForm(diaryFormProps: DiaryFormProps): JSX.Element {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const createNewDiary = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        diaryFormProps.setAlert(error.message);
      }

      if (error instanceof Error) {
        diaryFormProps.setAlert(error.message);
      }
    }
  };

  return (
    <form onSubmit={createNewDiary}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          id="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
      </div>

      <div>
        <label>Weather:</label>
        <fieldset>
          {Object.values(Weather).map((entry) => (
            <>
              <input
                type="radio"
                id={`weather-${entry.toString()}`}
                key={entry.toString()}
                value={entry.toString()}
                name="weather"
                onChange={(event) => {
                  setWeather(event.target.value);
                }}
              ></input>
              <label htmlFor={`weather-${entry.toString()}`}>
                {entry.toString()}
              </label>
            </>
          ))}
        </fieldset>
      </div>

      <div>
        <label>Visibility:</label>
        <fieldset>
          {Object.values(Visibility).map((entry) => (
            <>
              <input
                type="radio"
                id={`visibility-${entry.toString()}`}
                key={entry.toString()}
                value={entry.toString()}
                name="visibility"
                onChange={(event) => {
                  setVisibility(event.target.value);
                }}
              ></input>
              <label htmlFor={`visibility-${entry.toString()}`}>
                {entry.toString()}
              </label>
            </>
          ))}
        </fieldset>
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
