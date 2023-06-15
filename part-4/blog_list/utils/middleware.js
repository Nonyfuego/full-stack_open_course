/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const morgan = require('morgan');

const requestLogger = morgan('dev');

const unknownEndPoint = (_request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Invalid id format' });
  }
  if (error.name === 'ValidationError') {
    const errKey = Object.keys(error.errors)[0];
    return response.status(400).json({ error: error.errors[errKey].message });
  }
  next(error);
  // return response.status(400).json({ error: error.message });
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
};
