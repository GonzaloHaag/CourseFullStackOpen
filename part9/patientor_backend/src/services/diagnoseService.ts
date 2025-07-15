import diagnoseData from "../../data/diagnoses"
import { Diagnose } from "../types"

const getAllDiagnoses = ():Diagnose[] => {
    return diagnoseData;
}

export default {
    getAllDiagnoses
}