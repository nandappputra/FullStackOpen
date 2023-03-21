import { HealthCheckEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

export interface Props {
  entry: HealthCheckEntry;
}

export const HealthCheckEntryDetail = ({ entry }: Props): JSX.Element => {
  const displayHealthIndicator = () => {
    switch (entry.healthCheckRating) {
      case 1:
        return <FavoriteIcon style={{ color: "red" }} />;
      case 2:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case 3:
        return <FavoriteIcon style={{ color: "green" }} />;
    }
  };
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
      {displayHealthIndicator()}
      <p>diagnosed by: {entry.specialist}</p>
    </div>
  );
};
