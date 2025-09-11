const User = require('../models/Users.model');
const validateEmail = require('../valitions/emailValitions');
const jwt = require('jsonwebtoken');

const registionController = (req, res) => {
  const { fullName, email, password, dateOfBrith } = req.body;

  if (fullName || email || password || dateOfBrith) {
    return res.status(400).json({ message: 'All fealid required' });
  }

  if (validateEmail(email)) {
    return res.status(400).json({ message: `plise enter your correct email` });
  }

  const emailExit = User.findOne(email);

  if (emailExit) {
    return res.status(409).json({ message: 'email alredy exit' });
  }

  res.status(200).json({ message: 'registion routes' });
};

const loginControlller = (req, res) => {
  res.status(200).json({ message: 'i am login controller' });
};

module.exports = { registionController, loginControlller };
