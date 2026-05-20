const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      const error = new Error('Token tidak ditemukan');
      error.statusCode = 401;
      throw error;
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      const error = new Error('Format token tidak valid');
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.userId = decoded.id;

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = 'Access token tidak valid';
    next(error);
  }
};

module.exports = authMiddleware;