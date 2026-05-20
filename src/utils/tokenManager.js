const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: '3h',
  });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);
};

const verifyRefreshToken = (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
  } catch (error) {
    const newError = new Error('Refresh token tidak valid');
    newError.statusCode = 400;
    throw newError;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};