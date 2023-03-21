import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types";
import { isHealthCheckEntry } from "../../utils/patientUtils";

interface Props {
  patients: Patient[];
  diagnosis: Diagnosis[];
}

const PatientDetailPage = ({ patients, diagnosis }: Props) => {
  const id = useParams().id;
  const patient = patients.find((data) => data.id === id);

  if (typeof patient === "undefined") {
    return (
      <div>
        <p>not found</p>
      </div>
    );
  }

  const buildDiagnosesCode = (entry: Entry): JSX.Element => {
    if (!isHealthCheckEntry(entry)) {
      return (
        <ul>
          {entry.diagnosisCodes?.map((diagnosisCode) => (
            <li key={`${entry.id}-${diagnosisCode}`}>
              {diagnosisCode}{" "}
              {diagnosis.find((data) => data.code === diagnosisCode)?.name}
            </li>
          ))}
        </ul>
      );
    }

    return <></>;
  };

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>
        {patient.entries.map((entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            {buildDiagnosesCode(entry)}
          </div>
        ))}
      </h4>
    </div>
  );
};

export default PatientDetailPage;
