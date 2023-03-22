import { TextField, InputLabel, Grid, Button } from "@mui/material";
import { useState } from "react";
import { Entry, NewHospitalEntry, Patient } from "../../types";
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

  const onCancel = () => {
    setDate("");
    setEntryType("");
    setSpecialist("");
    setDiagnosisCodes("");
    setDescription("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  const addEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewHospitalEntry = {
      date,
      type: entryType,
      specialist,
      diagnosisCodes: diagnosisCodes.split(","),
      description,
      discharge: { date: dischargeDate, criteria: dischargeCriteria },
    };

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
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Type"
          fullWidth
          value={entryType}
          onChange={({ target }) => setEntryType(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
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
