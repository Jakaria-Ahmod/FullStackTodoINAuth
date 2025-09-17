const jwt = require('jsonwebtoken'); // তোমার User model path ঠিক করো
const User = require('../models/Users.model');
const authMiddleware = async (req, res, next) => {
  try {
    // 1. Token check করা
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]; // "Bearer <token>"
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, no token' });
    }

    // 2. Token verify করা
    const decoded = jwt.verify(token, process.env.ACCESS_KEY); // ACCESS_KEY = JWT_SECRET

    // 3. User find করা
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorized, user not found' });
    }

    // 4. Request এ attach করা
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed',
    });
  }
};

module.exports = authMiddleware;
