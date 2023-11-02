const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

const passwordValidationError = {
  name: 'PasswordValidationError',
  message: '',
};

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

usersRouter.post('/', async (request, response) => {
  // validate password before crypting
  if (!request.body.password) {
    passwordValidationError.message = 'Please provide a password';
    throw passwordValidationError;
  }
  if (request.body.password.length < 3) {
    passwordValidationError.message = 'Password must be at least 3 characters long';
    throw passwordValidationError;
  }
  const passwordHash = await bcrypt.hash(request.body.password, 10);
  const body = {
    ...request.body,
    password: passwordHash,
  };
  const newUser = new User(body);
  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
