const webToken = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

router.post('/', async (req, res) => {
  const authErrorMsg = 'username or password is incorrect';
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ error: authErrorMsg });
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: authErrorMsg });
  }
  // Generate a web token for user when login successful
  let payload = {
    username: user.username,
    id: user._id,
  };
  const token = webToken.sign(payload, SECRET);
  payload = {
    ...payload,
    token,
  };
  return res.status(200).json(payload);
});

module.exports = router;
