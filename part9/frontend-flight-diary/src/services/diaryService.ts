import axios from "axios"
import type { DiaryData, NewDiary } from "../types"

const baseUrl = 'http://localhost:3000/api/diaries'
const getAllDiaries = async() => {
    const response = await axios.get<DiaryData[]>(baseUrl);
    return response.data;
}
const createDiary = async (object:NewDiary) => {
    const response = await axios.post<DiaryData>(baseUrl,object);
    return response.data
}

export default {
    getAllDiaries,
    createDiary
}