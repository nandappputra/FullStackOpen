import { useParams } from "react-router-dom";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from "../../types";
import { HealthCheckEntryDetail } from "../EntryDetail/HealthCheckEntryDetail";
import { HospitalEntryDetail } from "../EntryDetail/HospitalEntryDetail";
import { OccupationalHealthcareEntryDetail } from "../EntryDetail/OccupationalHealthcareEntryDetail";

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
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetail entry={entry as HospitalEntry} />;
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntryDetail
            entry={entry as OccupationalHealthcareEntry}
          />
        );
      case "HealthCheck":
        return <HealthCheckEntryDetail entry={entry as HealthCheckEntry} />;
      default:
        throw new Error("unknown type");
    }
  };

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>
        {patient.entries.map((entry) => (
          <div key={entry.id}>{buildDiagnosesCode(entry)}</div>
        ))}
      </h4>
    </div>
  );
};

export default PatientDetailPage;
