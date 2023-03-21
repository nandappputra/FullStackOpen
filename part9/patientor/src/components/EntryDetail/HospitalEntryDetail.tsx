import { HospitalEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

export interface Props {
  entry: HospitalEntry;
}

export const HospitalEntryDetail = ({ entry }: Props): JSX.Element => {
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
        {entry.date} <WorkIcon />
      </p>
      <p>{entry.description}</p>
      <p>diagnosed by: {entry.specialist}</p>
    </div>
  );
};
