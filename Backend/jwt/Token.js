// Access Token Generate
const generateAccessToken = payload => {
  return jwt.sign(payload, process.env.ACCESS_KEY, { expiresIn: '15m' });
};

// Refresh Token Generate
const generateRefreshToken = payload => {
  return jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: '7d' });
};

module.exports = { generateAccessToken, generateRefreshToken };
