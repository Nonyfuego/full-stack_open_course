const express = require('express');
const cors = require('cors');
require('express-async-errors');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const { connectDatabase } = require('./utils/helpers');

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
