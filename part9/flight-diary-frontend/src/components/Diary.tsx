import { DiaryProps } from "../types/DiaryProps";

export function Diary(diaryProps: DiaryProps): JSX.Element {
  const diaryEntries = diaryProps.diaryEntries;
  return (
    <ul>
      {diaryEntries.map((entry) => (
        <li key={entry.id}>
          <p>{entry.date}</p>
          <p>{entry.visibility}</p>
          <p>{entry.weather}</p>
        </li>
      ))}
    </ul>
  );
}
