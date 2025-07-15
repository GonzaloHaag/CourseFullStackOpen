function calculateBmi(height:number, weight:number):string {
    const IMC:number = weight / Math.pow(height/100,2); // Debo convertir la altura a metros
    if(IMC < 18.5) {
        return 'Under (underweight)'
    }
    if(IMC >= 18.5 && IMC <= 25) {
        return 'Normal (healthy weight)'
    }
    if(IMC >= 25 && IMC <= 30) {
        return 'Elevated (overweight)'
    }
    if(IMC > 30) {
        return 'obesity'
    }

    return 'Invalid BMI'
}

try {
    // El primer argumento relevante es la altura, el segundo es el peso
    const args = process.argv.slice(5);

    if (args.length < 2) {
        throw new Error('Por favor, proporciona la altura (cm) y el peso (kg).');
    }

    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || height <= 0) {
        throw new Error('La altura debe ser un número mayor que cero.');
    }
    if (isNaN(weight) || weight <= 0) {
        throw new Error('El peso debe ser un número mayor que cero.');
    }

    console.log(calculateBmi(height, weight));
} catch (e: unknown) {
    if (e instanceof Error) {
        console.log('Error:', e.message);
    } else {
        console.log('Error desconocido');
    }
}

export default calculateBmi;