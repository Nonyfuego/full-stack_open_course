/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const webToken = require('jsonwebtoken');
const morgan = require('morgan');
const { SECRET } = require('./config');

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
    // console.log(error.errors[errKey].message);
    return response.status(400).json({ error: error.errors[errKey].message });
  }
  if (error.name === 'PasswordValidationError') {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  }
  next(error);
  // return response.status(400).json({ error: error.message });
};

const tokenExtractor = (req, _res, next) => {
  let token = req.get('Authorization');
  if (!token || !token.startsWith('bearer')) {
    // req.token = '';
    return next();
  }
  token = token.replace('bearer', '').trim();
  req.token = token;
  next();
};

const userExtractor = (req, _res, next) => {
  let user;
  if (!req.token) {
    return next();
  }
  const token = req.token;
  try {
    user = webToken.verify(token, SECRET);
    const userData = {
      username: user.username,
      id: user.id,
    };
    req.user = userData;
    next();
  } catch (err) {
    next();
  }
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
