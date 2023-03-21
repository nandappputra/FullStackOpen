import { OccupationalHealthcareEntry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export interface Props {
  entry: OccupationalHealthcareEntry;
}

export const OccupationalHealthcareEntryDetail = ({
  entry,
}: Props): JSX.Element => {
  return (
    <div
      style={{
        borderStyle: "solid",
        borderRadius: "1em",
        borderWidth: "2px",
        padding: "1em",
        margin: "1em",
      }}
    >
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>{entry.description}</p>
      <p>diagnosed by: {entry.specialist}</p>
    </div>
  );
};
