interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}
function calculateExercises(dailyHours: number[], objective: number): Result {
    console.log(dailyHours.length);
    const trainingDays: number = dailyHours.filter((daily) => daily !== 0).length; // filtro los que sean distintos de 0
    const averageTime = dailyHours.reduce((acc, item) => acc + item, 0) / dailyHours.length;
    let rating: 1 | 2 | 3;
    let ratingDescription: string;

    if (averageTime >= objective) {
        rating = 3;
        ratingDescription = 'Excellent! You have reached or exceeded your goal..';
    } else if (averageTime >= 0.8 * objective) {
        rating = 2;
        ratingDescription = 'Its not bad, but you could improve a little.';
    } else {
        rating = 1;
        ratingDescription = 'You need to put in more effort to achieve your goal.';
    }
    return {
        periodLength: dailyHours.length,
        trainingDays: trainingDays,
        target: objective,
        average: averageTime,
        success: averageTime > objective ? true : false,
        rating: rating,
        ratingDescription: ratingDescription
    }
}

try {
    // El primer argumento relevante es el objetivo, el resto son dailyHours
    const args = process.argv.slice(5);

    if (args.length < 2) {
        throw new Error('Por favor, proporciona el objetivo y al menos un día de horas.');
    }

    const objective = Number(args[0]);
    const dailyHours = args.slice(1).map(Number);

    if (isNaN(objective) || objective <= 0) {
        throw new Error('El objetivo debe ser un número mayor que cero.');
    }
    if (dailyHours.length === 0 || dailyHours.some(isNaN)) {
        throw new Error('Todos los valores de horas diarias deben ser números válidos.');
    }

    console.log(calculateExercises(dailyHours, objective));
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log('Error:', e.message);
    } else {
        console.log('Error desconocido');
    }
}

export default calculateExercises;