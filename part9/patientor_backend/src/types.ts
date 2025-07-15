export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

interface BaseEntry {
    id: string;
    date: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<string>;
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

// Define omit especial para uniones
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry sin la propiedad 'id'
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[] | [];
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>

export type NewPatient = Omit<Patient, 'id'>