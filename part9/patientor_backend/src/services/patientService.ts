import patientsData from "../../data/patients";
import { Entry, NewPatient, NonSensitivePatientEntry, Patient } from "../types";
import { randomUUID } from 'node:crypto'
const getAllPatients = ():NonSensitivePatientEntry[] => {
    return patientsData.map(({id,name,dateOfBirth,gender,occupation}) => ({
         id,
         name,
         dateOfBirth,
         gender,
         occupation
    }));
}

const addPatient = ( patient: NewPatient ):Patient => {
    const newPatient:Patient = {
        id:randomUUID(),
        ...patient
    }
    patientsData.push(newPatient);
    return newPatient
}

const getPatientById = (id:string) => {
    const patient = patientsData.find((p) => p.id === id);
    if (!patient) {
        throw new Error("Patient not found");
    }
    return patient;
}

const addEntryPatient = (id:string, entry:Entry ) => {
    const patient = getPatientById(id)
    if (!patient) {
        throw new Error("Patient not found");
    }
    patient.entries = [...patient.entries, entry];
    patientsData.push(patient);
    return patient
}

export default {
    getAllPatients,
    addPatient,
    getPatientById,
    addEntryPatient
}