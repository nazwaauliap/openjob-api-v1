const crypto = require('crypto');
const pool = require('../config/database');

const addCategory = async ({ name }) => {
  const id = `category-${crypto.randomUUID()}`;

  const query = {
    text: `
      INSERT INTO categories (id, name)
      VALUES ($1, $2)
      RETURNING id, name, created_at, updated_at
    `,
    values: [id, name],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

const getCategories = async () => {
  const result = await pool.query(`
    SELECT id, name, created_at, updated_at
    FROM categories
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getCategoryById = async (id) => {
  const query = {
    text: `
      SELECT id, name, created_at, updated_at
      FROM categories
      WHERE id = $1
    `,
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Category tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const editCategoryById = async (id, { name }) => {
  const query = {
    text: `
      UPDATE categories
      SET name = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, name, created_at, updated_at
    `,
    values: [name, id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Category tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const deleteCategoryById = async (id) => {
  const query = {
    text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Category tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  editCategoryById,
  deleteCategoryById,
};