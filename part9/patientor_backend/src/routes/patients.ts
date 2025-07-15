import express from 'express';
import { randomUUID } from 'node:crypto';
import patientService from '../services/patientService';
import toNewPatientEntry, { parseDiagnosisCodes, toNewEntry }  from '../utils';
import type { Entry, EntryWithoutId } from '../types';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAllPatients())
});

router.get('/:id',(req,res) => {
    const idPatient = req.params.id;
    res.send(patientService.getPatientById(idPatient))
})

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body); // me retorna el objeto formateado
        const addedPatient = patientService.addPatient(newPatientEntry)
        return res.json(addedPatient);
    } catch (error:unknown) {
        let errorMessage = "Something went wrong.";
        if(error instanceof Error) {
            errorMessage += "Error:" + error.message;
        }
        return res.status(400).send(errorMessage)
    }
});

router.post('/:id/entries',(req,res) => {
     try {
        const idPatient = req.params.id;
        const entry:EntryWithoutId = toNewEntry(req.body);
        const newEntry:Entry = {
            id:randomUUID(),
            ...entry,
            diagnosisCodes: parseDiagnosisCodes(entry)
        }
        return res.send(patientService.addEntryPatient(idPatient,newEntry));
     } catch (error) {
        let errorMessage = "Something went wrong.";
        if(error instanceof Error) {
            errorMessage += "Error:" + error.message;
        }
        return res.status(400).send(errorMessage)
     }
})

export default router;