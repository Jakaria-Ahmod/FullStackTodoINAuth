const User = require('../models/Users.model');
const validateEmail = require('../valitions/emailValitions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { generateAccessToken, generateRefreshToken } = require('../jwt/Token');
const cookieParser = require('cookie-parser');

const registionController = async (req, res) => {
  try {
    const { fullName, email, password, dateOfBrith } = req.body;

    if (!fullName || !email || !password || !dateOfBrith) {
      return res.status(400).json({ message: 'All fealid required' });
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: `plise enter your correct email` });
    }

    const emailExit = await User.findOne({ email });

    if (emailExit) {
      return res.status(409).json({ message: 'email alredy exit' });
    }

    const newUser = await new User({
      fullName,
      email,
      password: hasedPassword,
      dateOfBrith,
      isVerified: false,
    });

    await newUser.save();

    // Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail
      auth: {
        user: process.env.MY_EMAIL, // you mail
        pass: process.env.MY_APP_PASSWORD, // App Password
      },
    });
    //
    const AccessToken = generateAccessToken({ id: newUser._id });

    const verifyLink = `${process.env.CLINT_URL}/verify/${AccessToken}`;

    // Mail options
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: ` ${newUser.email}`,
      subject: 'verify your Email',
      html: `<h3>Please Verify your account: <a href="${verifyLink}">Click Here</a></h3>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error:', error);
      }
      console.log('Email sent:', info.response);
    });

    res.status(200).json({
      message: 'Registion successfully pliese verify your mail',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'server error',
      error: error.message,
    });
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;
    const decode = jwt.verify(token, process.env.ACCESS_KEY);
    const userExit = await User.findById(decode.id);
    if (!userExit) {
      res.status(400).json({ message: 'user not exit plise try agin' });
    }

    userExit.isVerified = true;
    await userExit.save();

    res.status(203).json({ message: 'user verify successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      error: error.message,
    });
  }
};

const loginControlller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'all feaild required',
      });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: `plise enter your correct email` });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({ message: 'invlid password' });
    }

    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Client JS access
      secure: true, //
      sameSite: 'strict', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      email: User.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'server errr',
      error: error.message,
    });
  }
};

const refreshController = async (req, res) => {
  try {
    const token = req.cookies.refreshToken; //
    if (!token) {
      return res.status(400).json({ message: 'Refresh token not provided' });
    }

    // Verify refresh token
    jwt.verify(token, process.env.REFRESH_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // accesstoken
      const accessToken = generateAccessToken({ id: decoded.id });

      return res.status(200).json({
        success: true,
        accessToken,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: 'token no provide' });
    }
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'all feaild required' });
    }

    const decode = jwt.verify(token, process.env.ACCESS_KEY);

    const userExit = await User.findById(decode.id);

    if (!userExit) {
      return res.status(400).json({ message: 'user not found ' });
    }

    userExit.password = await bcrypt.hash(password, 10);
    userExit.save();

    res.status(403).json({ message: 'password reset successfully' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'pliese All feaild required' });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ message: `plise enter your correct email` });
    }

    const userExit = await User.findOne({ email });
    if (!userExit) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = generateAccessToken({ id: userExit.id });

    const resetLink = `${process.env.CLINT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail
      auth: {
        user: process.env.MY_EMAIL, // you mail
        pass: process.env.MY_APP_PASSWORD, // App Password
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: ` ${userExit.email}`,
      subject: 'reset password',
      html: `<h3>Please reset password: <a href="${resetLink}">Click Here</a></h3>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error:', error);
      }
      console.log('Email sent:', info.response);
    });

    res.status(200).json({ message: 'plise check your email' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const allUserController = async (req, res) => {
  try {
    const allUser = await User.find();
    res
      .status(203)
      .json({ message: 'get all User sucessfully', allUser: allUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registionController,
  loginControlller,
  verifyEmailController,
  refreshController,
  resetPasswordController,
  forgetPasswordController,
  allUserController,
};
