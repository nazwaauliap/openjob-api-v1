const crypto = require('crypto');
const pool = require('../config/database');

const addCompany = async ({ name, description, website, location }) => {
  const id = `company-${crypto.randomUUID()}`;

  const query = {
    text: `
      INSERT INTO companies (id, name, description, website, location)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, description, website, location, created_at, updated_at
    `,
    values: [id, name, description || null, website || null, location || null],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

const getCompanies = async () => {
  const result = await pool.query(`
    SELECT id, name, description, website, location, created_at, updated_at
    FROM companies
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getCompanyById = async (id) => {
  const query = {
    text: `
      SELECT id, name, description, website, location, created_at, updated_at
      FROM companies
      WHERE id = $1
    `,
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Company tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const editCompanyById = async (id, { name, description, website, location }) => {
  const query = {
    text: `
      UPDATE companies
      SET name = $1,
          description = $2,
          website = $3,
          location = $4,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, name, description, website, location, created_at, updated_at
    `,
    values: [name, description || null, website || null, location || null, id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Company tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const deleteCompanyById = async (id) => {
  const query = {
    text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Company tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  addCompany,
  getCompanies,
  getCompanyById,
  editCompanyById,
  deleteCompanyById,
};