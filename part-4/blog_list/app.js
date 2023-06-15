const db = require('mongoose');
const express = require('express');
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');

const app = express();

logger.info('connecting to database...');

db.set('strictQuery', false);
db.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to database...'))
  .catch((err) => logger.error(err));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
