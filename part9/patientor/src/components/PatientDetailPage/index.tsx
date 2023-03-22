import { useParams } from "react-router-dom";
import { useState } from "react";
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
import { AddEntryForm } from "./AddEntryForrm";
import { Alert } from "@mui/material";

interface Props {
  patients: Patient[];
  diagnosis: Diagnosis[];
  updatePatients(updatedPatient: Patient): void;
}

const PatientDetailPage = ({ patients, diagnosis, updatePatients }: Props) => {
  const [alertMessage, setAlertMessage] = useState<string>("");

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

  const setAlert = (message: string): void => {
    setAlertMessage(message);

    setTimeout(()=>setAlert(""), 5000);
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      {alertMessage === "" ? (
        <></>
      ) : (
        <Alert severity="error">{alertMessage}</Alert>
      )}
      <AddEntryForm patient={patient} updatePatients={updatePatients} setAlert={setAlert}/>
      <h4>
        {patient.entries.map((entry) => (
          <div key={entry.id}>{buildDiagnosesCode(entry)}</div>
        ))}
      </h4>
    </div>
  );
};

export default PatientDetailPage;
