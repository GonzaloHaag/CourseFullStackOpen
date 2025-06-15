/** La app real */
const config = require('./utils/config');
const express = require('express');
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
const connectToMongo = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('error connecting to MongoDB:', error.message)
  }
}

// Llamada a la funcion
connectToMongo()

app.use(cors())
app.use(express.static('dist')) // servir archivos estaticos
app.use(express.json())
/** Usar los middleware */
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor); // Disponible para todas mis rutas
// usa el middleware solo en las rutas de api/blogs, solo puede haber una linea con misma ruta
app.use('/api/blogs', blogsRouter);
app.use('/api/users',usersRouter);
app.use('/api/login', loginRouter);
/** Solo ejecutare esto si estoy en modo prueba */
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter); // post a /api/testing
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app