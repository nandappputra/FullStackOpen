import { useEffect, useState } from "react";
import { Diary } from "./components/Diary";
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

  return (
    <div>
      <Diary diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
