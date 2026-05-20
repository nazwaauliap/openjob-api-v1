const pool = require('../config/database');

const addRefreshToken = async (token) => {
  const query = {
    text: 'INSERT INTO authentications (token) VALUES ($1)',
    values: [token],
  };

  await pool.query(query);
};

const verifyRefreshTokenInDatabase = async (token) => {
  const query = {
    text: 'SELECT token FROM authentications WHERE token = $1',
    values: [token],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Refresh token tidak ditemukan di database');
    error.statusCode = 400;
    throw error;
  }
};

const deleteRefreshToken = async (token) => {
  const query = {
    text: 'DELETE FROM authentications WHERE token = $1',
    values: [token],
  };

  await pool.query(query);
};

module.exports = {
  addRefreshToken,
  verifyRefreshTokenInDatabase,
  deleteRefreshToken,
};