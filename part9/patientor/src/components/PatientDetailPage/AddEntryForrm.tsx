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
import {
  Entry,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  Patient,
} from "../../types";
import patientService from "../../services/patients";
import axios from "axios";

interface Props {
  patient: Patient;
  updatePatients(updatedPatient: Patient): void;
  setAlert(message: string): void;
}

export function AddEntryForm({
  patient,
  updatePatients,
  setAlert,
}: Props): JSX.Element {
  const [date, setDate] = useState<string>("");
  const [entryType, setEntryType] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");
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
    setDiagnosisCodes("");
    setDescription("");
    setDischargeDate("");
    setDischargeCriteria("");
    setHealthCheckRating("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };

  const entryTypes = ["Hospital", "OccupationalHealthcare", "HealthCheck"];

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setEntryType(event.target.value);
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
          diagnosisCodes: diagnosisCodes.split(","),
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
          diagnosisCodes: diagnosisCodes.split(","),
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
        <TextField
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>
        <TextField
          label="Discharge date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
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
        <TextField
          label="healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
      </>
    );
  };

  const showOccupationalHealthcareEntryFields = () => {
    return (
      <>
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
        <TextField
          label="sick leave start date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
          label="sick leave end date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
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
      <InputLabel style={{ margin: 20 }}>Entry Type</InputLabel>
      <Select label="type" fullWidth value={entryType} onChange={onTypeChange}>
        {entryTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>

      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
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
    </div>
  );
}
