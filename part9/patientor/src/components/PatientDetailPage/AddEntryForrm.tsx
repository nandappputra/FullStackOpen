import {
  TextField,
  InputLabel,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Diagnosis,
  Entry,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  Patient,
} from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { toStringArray } from "../../utils/patientUtils";

interface Props {
  patient: Patient;
  updatePatients(updatedPatient: Patient): void;
  setAlert(message: string): void;
  diagnosis: Diagnosis[];
}

export function AddEntryForm({
  patient,
  updatePatients,
  setAlert,
  diagnosis,
}: Props): JSX.Element {
  const [date, setDate] = useState<string>("");
  const [entryType, setEntryType] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  const onCancel = () => {
    setDate("");
    setEntryType("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setDescription("");
    setDischargeDate("");
    setDischargeCriteria("");
    setHealthCheckRating("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };

  const entryTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];
  const healthCheckRatingOptions = ["1", "2", "3"];

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setEntryType(event.target.value);
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setHealthCheckRating(event.target.value);
  };

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newEntry: NewEntry;
    switch (entryType) {
      case "Hospital":
        const newHospitalEntry: NewHospitalEntry = {
          date,
          type: entryType,
          specialist,
          diagnosisCodes: diagnosisCodes,
          description,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        };

        newEntry = newHospitalEntry;
        break;
      case "HealthCheck":
        const newHealthCheckEntry: NewHealthCheckEntry = {
          date,
          type: entryType,
          specialist,
          description,
          healthCheckRating: parseInt(healthCheckRating),
        };

        newEntry = newHealthCheckEntry;
        break;
      default:
        const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
          date,
          type: entryType,
          specialist,
          description,
          employerName,
          diagnosisCodes: diagnosisCodes,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };

        newEntry = newOccupationalHealthcareEntry;
    }

    try {
      const addedEntry: Entry = await patientService.addNewEntry(
        newEntry,
        patient.id
      );

      const updatedPatient = { ...patient };
      updatedPatient.entries.push(addedEntry);

      updatePatients(updatedPatient);
      onCancel();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          setAlert(error.response?.data);
        } else {
          setAlert(error.message);
        }
      }
    }
  };

  const showHospitalEntryFields = () => {
    return (
      <>
        <Select
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(toStringArray(target.value))
          }
          multiple
        >
          {diagnosis.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.code}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
        <DatePicker
          label="Discharge date"
          value={dischargeDate}
          onChange={(date) => {
            if (date !== null) setDischargeDate(date);
          }}
        />
        <TextField
          label="Discharge criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
        />
      </>
    );
  };

  const showHealthCheckEntryFields = () => {
    return (
      <>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Select
          label="Health check rating"
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };

  const showOccupationalHealthcareEntryFields = () => {
    return (
      <>
        <Select
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(toStringArray(target.value))
          }
          multiple
        >
          {diagnosis.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.code}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Sick leave</InputLabel>
        <DatePicker
          label="sick leave start date"
          value={sickLeaveStartDate}
          onChange={(date) => {
            if (date !== null) setSickLeaveStartDate(date);
          }}
        />
        <DatePicker
          label="sick leave end date"
          value={sickLeaveEndDate}
          onChange={(date) => {
            if (date !== null) setSickLeaveEndDate(date);
          }}
        />
      </>
    );
  };

  return (
    <div
      style={{
        padding: "1em",
        margin: "5em",
        borderWidth: "3px",
        borderRadius: "1em",
        borderColor: "black",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InputLabel style={{ margin: 20 }}>Entry Type</InputLabel>
        <Select
          label="type"
          fullWidth
          value={entryType}
          onChange={onTypeChange}
        >
          {entryTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

        <form onSubmit={addEntry}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(date) => {
              if (date !== null) setDate(date);
            }}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />

          {entryType === "Hospital" ? showHospitalEntryFields() : <></>}
          {entryType === "HealthCheck" ? showHealthCheckEntryFields() : <></>}
          {entryType === "OccupationalHealthcare" ? (
            showOccupationalHealthcareEntryFields()
          ) : (
            <></>
          )}

          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </LocalizationProvider>
    </div>
  );
}
