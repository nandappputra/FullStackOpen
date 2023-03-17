import { useEffect, useState } from "react";
import { Alert } from "./components/Alert";
import { Diary } from "./components/Diary";
import { DiaryForm } from "./components/DiaryForm";
import { getAllDiaries } from "./services/DiariesService";
import { NonSensitiveDiaryEntry } from "./types/DiaryEntry";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    []
  );
  const [alert, setAlert] = useState<string>("");

  useEffect(() => {
    getAllDiaries().then((diaries) => {
      setDiaryEntries(diaries);
    });
  }, []);

  const addDiaryEntries = (diaryEntry: NonSensitiveDiaryEntry) => {
    setDiaryEntries([...diaryEntries, diaryEntry]);
  };

  const setAlertMessage = (alert: string) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert("");
    }, 5000);
  };

  return (
    <div>
      <Alert alert={alert} />
      <DiaryForm addDiaryEntry={addDiaryEntries} setAlert={setAlertMessage} />
      <Diary diaryEntries={diaryEntries} />
    </div>
  );
}

export default App;
