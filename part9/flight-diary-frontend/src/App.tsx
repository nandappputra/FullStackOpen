import { useEffect, useState } from "react";
import { Diary } from "./components/Diary";
import { DiaryForm } from "./components/DiaryForm";
import { getAllDiaries } from "./services/DiariesService";
import { NonSensitiveDiaryEntry } from "./types/DiaryEntry";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  useEffect(() => {
    getAllDiaries().then((diaries) => {
      setDiaryEntries(diaries);
    });
  }, []);

  const addDiaryEntries = (diaryEntry: NonSensitiveDiaryEntry) => {
    setDiaryEntries([...diaryEntries, diaryEntry]);
  };

  return (
    <div>
      <DiaryForm addDiaryEntry={addDiaryEntries} />
      <Diary diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
