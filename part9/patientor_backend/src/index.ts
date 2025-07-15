import express from "express";
import cors from 'cors';
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/ping',(_req,res) => {
    res.send('Hello Fullstack developer')
})

app.use('/api/diagnoses',diagnosesRouter)
app.use('/api/patients',patientsRouter)

const PORT = 3003;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})