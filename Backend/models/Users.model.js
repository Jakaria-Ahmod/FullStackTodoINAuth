const mongoose = require('mongoose');

const userShcema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBrith: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userShcema);

module.exports = User;
