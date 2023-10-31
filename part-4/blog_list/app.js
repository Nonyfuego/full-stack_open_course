const express = require('express');
const cors = require('cors');
require('express-async-errors');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { connectDatabase } = require('./utils/helpers');

const app = express();

connectDatabase();

app.use(cors());
// parses incoming json data into javascript object
app.use(express.json());
// logs request info to console
app.use(middleware.requestLogger);
// extracts token from request authorization header
// sets the token to the request object
app.use(middleware.tokenExtractor);
// sets user to request object only when
// token is valid.
app.use(middleware.userExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
