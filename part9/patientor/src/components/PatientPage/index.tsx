import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import type { Patient } from "../../types";
import { Female, Male } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import diagnosesService from "../../services/diagnoses";
import type { Diagnosis } from "../../types";

// Tipos para el formulario de entrada
import type {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthCareEntry,
  EntryWithoutId
} from "../../types";

type EntryFormState =
  | (Omit<HealthCheckEntry, "id"> & { type: "HealthCheck" })
  | (Omit<HospitalEntry, "id"> & { type: "Hospital" })
  | (Omit<OccupationalHealthCareEntry, "id"> & { type: "OccupationalHealthcare" });

const initialState: EntryFormState = {
  type: "HealthCheck",
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: 0
};
const isHealthCheck = (entry: EntryFormState): entry is Omit<HealthCheckEntry, "id"> & { type: "HealthCheck" } => entry.type === "HealthCheck";
const isHospital = (entry: EntryFormState): entry is Omit<HospitalEntry, "id"> & { type: "Hospital" } => entry.type === "Hospital";
const isOccupationalHealthcare = (entry: EntryFormState): entry is Omit<OccupationalHealthCareEntry, "id"> & { type: "OccupationalHealthcare" } => entry.type === "OccupationalHealthcare";

const PatientPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const [entryValues, setEntryValues] = useState<EntryFormState>(initialState);
    const [diagnosisCodesInput, setDiagnosisCodesInput] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const params = useParams();
    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.findById(params.id);
            setPatient(patient);
        };
        void fetchPatient();
        const fetchDiagnoses = async () => {
            const data = await diagnosesService.getAll();
            setDiagnoses(data);
        };
        void fetchDiagnoses();
    }, [params]);

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const type = e.target.value as EntryFormState["type"];
      setDiagnosisCodesInput([]); // Limpiar diagnosisCodesInput al cambiar tipo
      if (type === "HealthCheck") {
        setEntryValues({
          type,
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          healthCheckRating: 0
        });
      } else if (type === "Hospital") {
        setEntryValues({
          type,
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          discharge: { date: "", criteria: "" }
        });
      } else if (type === "OccupationalHealthcare") {
        setEntryValues({
          type,
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          employerName: "",
          sickLeave: { startDate: "", endDate: "" }
        });
      }
    };

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        setError(null);
        const diagnosisCodes = diagnosisCodesInput;
        try {
          const updatedPatient = await patientService.createEntry(params.id, { ...entryValues, diagnosisCodes } as EntryWithoutId);
          setPatient(updatedPatient);
          setEntryValues(initialState);
          setDiagnosisCodesInput([]);
        } catch (e: unknown) {
          if (e && typeof e === "object" && "response" in e && e.response && typeof e.response === "object" && "data" in e.response && e.response.data && typeof e.response.data === "object" && "error" in e.response.data) {
            setError((e.response.data as { error?: string }).error || "Unknown error");
          } else if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("Unknown error");
          }
        }
    };

    const onClickCancel = () => {
        setEntryValues(initialState);
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>{patient?.name} {patient?.gender === 'male' ? <Male /> : <Female />}</Typography>
            <Typography variant="h5">ssn: {patient?.ssn || 'none'}</Typography>
            <Typography variant="h5">occupation: {patient?.occupation}</Typography>
            <Box sx={{padding:'0.5rem',border:'1px dashed black'}}>
                <form onSubmit={addEntry} style={{display:'flex',flexDirection:'column', gap:'0.5rem'}}>
                    <Typography variant="h5">New Entry</Typography>
                    {error && (
                      <Typography color="error">{error}</Typography>
                    )}
                    <TextField
                        select
                        label="Type"
                        value={entryValues.type}
                        onChange={handleTypeChange}
                        SelectProps={{ native: true }}
                    >
                        <option value="HealthCheck">HealthCheck</option>
                        <option value="Hospital">Hospital</option>
                        <option value="OccupationalHealthcare">OccupationalHealthcare</option>
                    </TextField>
                    <TextField
                        label="Description"
                        fullWidth
                        value={entryValues.description}
                        name="description"
                        onChange={(e) => setEntryValues({...entryValues, description: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        placeholder="YYYY-MM-DD"
                        value={entryValues.date}
                        onChange={(e) => setEntryValues({...entryValues, date: e.target.value})}
                        type="date"
                    />
                    <TextField
                        label="Specialist"
                        fullWidth
                        value={entryValues.specialist}
                        onChange={(e) => setEntryValues({...entryValues, specialist: e.target.value})}
                    />
                    <TextField
                        label="Diagnosis codes"
                        fullWidth
                        select
                        SelectProps={{
                          multiple: true
                        }}
                        value={diagnosisCodesInput}
                        onChange={e => {
                          const value = e.target.value;
                          setDiagnosisCodesInput(typeof value === 'string' ? value.split(',') : value);
                        }}
                        helperText="Select one or more diagnosis codes"
                    >
                        {diagnoses.map((diag) => (
                          <MenuItem key={diag.code} value={diag.code}>
                            {diag.code} - {diag.name}
                          </MenuItem>
                        ))}
                    </TextField>
                    {/* Campos específicos por tipo */}
                    {isHealthCheck(entryValues) && (
                      <TextField
                        label="Healthcheck rating"
                        fullWidth
                        type="number"
                        value={entryValues.healthCheckRating}
                        onChange={e =>
                          setEntryValues({
                            ...entryValues,
                            healthCheckRating: Number(e.target.value)
                          })
                        }
                      />
                    )}
                    {isHospital(entryValues) && (
                      <>
                        <TextField
                          fullWidth
                          value={entryValues.discharge.date}
                          onChange={e =>
                            setEntryValues({
                              ...entryValues,
                              discharge: {
                                ...entryValues.discharge,
                                date: e.target.value
                              }
                            })
                          }
                        />
                        <TextField
                          label="Discharge criteria"
                          fullWidth
                          value={entryValues.discharge.criteria}
                          onChange={e =>
                            setEntryValues({
                              ...entryValues,
                              discharge: {
                                ...entryValues.discharge,
                                criteria: e.target.value
                              }
                            })
                          }
                        />
                      </>
                    )}
                    {isOccupationalHealthcare(entryValues) && (
                      <>
                        <TextField
                          label="Employer name"
                          fullWidth
                          value={entryValues.employerName}
                          onChange={e =>
                            setEntryValues({
                              ...entryValues,
                              employerName: e.target.value
                            })
                          }
                        />
                        <TextField
                          label="Sick leave start"
                          fullWidth
                          value={entryValues.sickLeave?.startDate ?? ""}
                          onChange={e =>
                            setEntryValues({
                              ...entryValues,
                              sickLeave: {
                                startDate: e.target.value,
                                endDate: entryValues.sickLeave?.endDate ?? ""
                              }
                            })
                          }
                        />
                        <TextField
                          fullWidth
                          value={entryValues.sickLeave?.endDate ?? ""}
                          type="date"
                          onChange={e =>
                            setEntryValues({
                              ...entryValues,
                              sickLeave: {
                                startDate: entryValues.sickLeave?.startDate ?? "",
                                endDate: e.target.value
                              }
                            })
                          }
                        />
                      </>
                    )}
                    <Grid>
                        <Grid item>
                            <Button
                                color="secondary"
                                variant="contained"
                                style={{ float: "left" }}
                                type="button"
                                onClick={onClickCancel}
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
            </Box>
            <Box>
                <Typography variant="h6">Entries</Typography>
                {
                    patient?.entries && patient.entries.length > 0 && (
                        patient.entries.map((patient_entry) => (
                            <EntryDetails key={patient_entry.id} entry={patient_entry} />
                        ))
                    )
                }
            </Box>
        </Box>
    );
};

export default PatientPage;
