const bcrypt = require('bcrypt');
const crypto = require('crypto');
const pool = require('../config/database');

const addUser = async ({ name, email, password, role }) => {
  const id = `user-${crypto.randomUUID()}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = {
    text: `
      INSERT INTO users (id, name, email, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, role
    `,
    values: [id, name, email, hashedPassword, role],
  };

  const result = await pool.query(query);

  return result.rows[0];
};

const getUserById = async (id) => {
  const query = {
    text: `
      SELECT id, name, email, role, created_at, updated_at 
      FROM users 
      WHERE id = $1
    `,
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('User tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const verifyUserCredential = async (email, password) => {
  const query = {
    text: 'SELECT id, password FROM users WHERE email = $1',
    values: [email],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Email atau password salah');
    error.statusCode = 401;
    throw error;
  }

  const { id, password: hashedPassword } = result.rows[0];

  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordMatch) {
    const error = new Error('Email atau password salah');
    error.statusCode = 401;
    throw error;
  }

  return id;
};

module.exports = {
  addUser,
  getUserById,
  verifyUserCredential,
};