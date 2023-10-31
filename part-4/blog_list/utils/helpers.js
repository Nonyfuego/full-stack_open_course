const mongoose = require('mongoose');
const { isEmpty } = require('lodash');
const config = require('./config');
const logger = require('./logger');
const User = require('../models/user');

const getRandomUser = async () => {
  const users = await User.find({});
  if (isEmpty(users)) {
    return null;
  }
  const randomNum = Math.floor(Math.random() * users.length);
  const randomUser = users[randomNum];
  return randomUser;
};

const connectDatabase = async () => {
  mongoose.set('strictQuery', false);
  mongoose.set('bufferTimeoutMS', 30000);
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

module.exports = {
  connectDatabase,
  getRandomUser,
};
