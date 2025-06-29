const jwt = require('jsonwebtoken');
const User = require('../models/user');
/** Para obtener los errores */
const logger = require('./logger')
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({
      error: 'expected `username` to be unique'
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })

  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

/** Midleware para extraer el token */

const tokenExtractor = (request, response, next) => {
  /** Codigo para extraer el token */
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '') // Mi aplicacion puede usar request.token
  }
  else {
    request.token = null
  }

  next();
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
          const token = authorization.substring(7);
          request.token = token;
          const decodedToken = jwt.verify(token, process.env.SECRET);
          if (!decodedToken.id) {
              return response.status(401).json({ error: 'Token inválido' });
          }

          const user = await User.findById(decodedToken.id);
          request.user = user;
      } catch (error) {
          return response.status(401).json({ error: 'Token inválido' });
      }
  }
  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}