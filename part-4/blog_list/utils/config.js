require('dotenv').config();

const {
  MONGODB_URI,
  PORT,
  MONGODB_TEST_URI,
  SECRET,
} = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
  MONGODB_TEST_URI,
  SECRET,
};
