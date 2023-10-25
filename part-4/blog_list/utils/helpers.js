const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connectDatabase = async () => {
  mongoose.set('strictQuery', false);
  if (process.env.NODE_ENV === 'test') {
    logger.info('connecting to test database...');
    await mongoose.connect(config.MONGODB_TEST_URI);
    logger.info('Connected to test database...');
  } else {
    logger.info('connecting to database');
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to database');
  }
};

module.exports = { connectDatabase };
