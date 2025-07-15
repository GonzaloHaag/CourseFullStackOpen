import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());
app.get('/hello',(_req,res) => {
    res.send('Hello Full Stack');
})

app.get('/bmi',(req,res) => {
    const query = req.query;
    if(!query.height || !query.weight) {
        return res.json({
           error: "malformatted parameters"
        })
    }

    if(isNaN(Number(query.height)) || isNaN(Number(query.weight))) {
        return res.json({
            error: "malformatted parameters"
         })
    }

    const height:number = Number(query.height);
    const weight:number = Number(query.weight);
    return res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(height,weight)
    })
});

app.post('/exercises',(req,res) => {

    if(!req.body) {
        return res.json({
            error:"parameters missing"
        })
    }
    const body = req.body;
    if(!body.daily_exercises || !body.target) {
        return res.json({
            error:"parameters missing"
        })
    }
    if(isNaN(Number(body.target))) {
        return res.json({
            error:"malformatted parameters"
        })
    }
    const dailyExercises:number[] = body.daily_exercises;
    const target:number = body.target;
    const response = calculateExercises(dailyExercises,target)
    return res.json(response)
})


const PORT = 3003;

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`)
})