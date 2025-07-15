import { Diagnose, Gender, NewPatient } from './types'
import type { EntryWithoutId, HealthCheckRating } from './types';
const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error('Incorrect or missing data');
    }
    // Uknown no permite hacer operaciones sin validarlo antes, tengo que validar que las propiedades se encuentren dentro del objeto
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender as Gender),
            occupation: parseOccupation(object.occupation),
            entries:[]
        }
        return newPatient;
    }
    /** Excepcion si la guarda no retorna true */
    throw new Error('Incorrect data: some fields are missing');

}

export const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing entry data');
  }
  if (!('type' in object) || !isString(object.type)) {
    throw new Error('Missing or invalid entry type');
  }
  if (!('description' in object) || !isString(object.description)) {
    throw new Error('Missing or invalid description');
  }
  if (!('date' in object) || !isString(object.date) || !isDate(object.date)) {
    throw new Error('Missing or invalid date');
  }
  if (!('specialist' in object) || !isString(object.specialist)) {
    throw new Error('Missing or invalid specialist');
  }
  // diagnosisCodes es opcional pero si existe debe ser array de string
  let diagnosisCodes: string[] | undefined = undefined;
  if ('diagnosisCodes' in object) {
    if (!Array.isArray(object.diagnosisCodes) || !object.diagnosisCodes.every(isString)) {
      throw new Error('diagnosisCodes must be an array of strings');
    }
    diagnosisCodes = object.diagnosisCodes;
  }
  switch (object.type) {
    case 'HealthCheck': {
      if (!('healthCheckRating' in object) || typeof object.healthCheckRating !== 'number' ||
        object.healthCheckRating < 0 || object.healthCheckRating > 3) {
        throw new Error('Missing or invalid healthCheckRating');
      }
      return {
        type: 'HealthCheck',
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes,
        healthCheckRating: object.healthCheckRating as HealthCheckRating
      };
    }
    case 'Hospital': {
      if (!('discharge' in object) || typeof object.discharge !== 'object' || object.discharge === null ||
        !('date' in object.discharge) || !isString(object.discharge.date) || !isDate(object.discharge.date) ||
        !('criteria' in object.discharge) || !isString(object.discharge.criteria)) {
        throw new Error('Missing or invalid discharge for Hospital entry');
      }
      return {
        type: 'Hospital',
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes,
        discharge: {
          date: object.discharge.date,
          criteria: object.discharge.criteria
        }
      };
    }
    case 'OccupationalHealthcare': {
      if (!('employerName' in object) || !isString(object.employerName)) {
        throw new Error('Missing or invalid employerName for OccupationalHealthcare entry');
      }
      let sickLeave;
      if ('sickLeave' in object && object.sickLeave !== null) {
        if (typeof object.sickLeave !== 'object' ||
          !('startDate' in object.sickLeave) || !isString(object.sickLeave.startDate) || !isDate(object.sickLeave.startDate) ||
          !('endDate' in object.sickLeave) || !isString(object.sickLeave.endDate) || !isDate(object.sickLeave.endDate)) {
          throw new Error('Invalid sickLeave for OccupationalHealthcare entry');
        }
        sickLeave = {
          startDate: object.sickLeave.startDate,
          endDate: object.sickLeave.endDate
        };
      }
      return {
        type: 'OccupationalHealthcare',
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes,
        employerName: object.employerName,
        ...(sickLeave ? { sickLeave } : {})
      };
    }
    default:
      throw new Error('Unknown entry type');
  }
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
    /** Es una funcion guarda de tipo, devuelve un booleano y tiene un predicado
     * de tipo como tipo de retorno, el predicado es text is string
     * Devuelve un valor booleano
     */
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (str: string): str is Gender => {
    return Object.values(Gender).map((g) => g.toString()).includes(str); // true si esta en el enum, false sino
}
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name')
    }
    return name;
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date)
    }
    return date;
}
const parseGender = (gender: Gender): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender')
    }
    return gender as Gender;
}
const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation')
    }
    return occupation;
}
const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn')
    }
    return ssn;
}

export default toNewPatientEntry;