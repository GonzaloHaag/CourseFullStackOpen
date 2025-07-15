import { Box } from "@mui/material";
import { Entry } from "../../types";
import { assertNever } from "../../utils";

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return (
                <Box sx={{ padding: '1rem', border: '1px solid black', borderRadius: '0.4rem',marginTop:'1.2rem' }}>
                    <div>{entry.date} {entry.description}</div>
                    <div>Discharge: {entry.discharge.date} - {entry.discharge.criteria}</div>
                    <div>Diagnose by: {entry.specialist}</div>
                </Box>
            );
        case 'OccupationalHealthcare':
            return (
                <Box sx={{ padding: '1rem', border: '1px solid black', borderRadius: '0.4rem', marginTop:'1.2rem' }}>
                    <div>{entry.date} {entry.description}</div>
                    <div>Employer: {entry.employerName}</div>
                    <div>Diagnose by: {entry.specialist}</div>
                </Box>

            );
        case "HealthCheck":
            return (
                <Box sx={{ padding: '1rem', border: '1px solid black', borderRadius: '0.4rem', marginTop:'1.2rem' }}>
                    <div>{entry.date} {entry.description}</div>
                    <div>Health rating: {entry.healthCheckRating}</div>
                    <div>Diagnose by: {entry.specialist}</div>
                </Box>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
