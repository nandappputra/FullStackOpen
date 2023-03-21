import { useParams } from "react-router-dom";
import { Patient } from "../../types";

interface Props {
  patients: Patient[];
}

const PatientDetailPage = ({ patients }: Props) => {
  const id = useParams().id;
  const patient = patients.find((data) => data.id === id);

  if (typeof patient === "undefined") {
    return (
      <div>
        <p>not found</p>
      </div>
    );
  }

  return (
    <div>
      <p>{patient.name}</p>
      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetailPage;
