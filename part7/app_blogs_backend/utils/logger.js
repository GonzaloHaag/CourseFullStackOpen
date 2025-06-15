/** El logger tiene dos funciones, 
 * info para imprimir mensajes de registro normales y 
 * error para todos los mensajes de error. */
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params)
    }
}

module.exports = {
    info, error
}