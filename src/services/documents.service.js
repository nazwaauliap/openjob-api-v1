const crypto = require('crypto');
const fs = require('fs');
const pool = require('../config/database');

const addDocument = async (userId, file) => {
  const id = `document-${crypto.randomUUID()}`;

  const query = {
    text: `
      INSERT INTO documents (id, user_id, original_name, filename, mimetype, size, path)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, user_id, original_name, filename, mimetype, size, path, created_at
    `,
    values: [
      id,
      userId,
      file.originalname,
      file.filename,
      file.mimetype,
      file.size,
      file.path,
    ],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

const getDocuments = async () => {
  const result = await pool.query(`
    SELECT id, user_id, original_name, filename, mimetype, size, path, created_at
    FROM documents
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const getDocumentById = async (id) => {
  const query = {
    text: `
      SELECT id, user_id, original_name, filename, mimetype, size, path, created_at
      FROM documents
      WHERE id = $1
    `,
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Document tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const deleteDocumentById = async (id) => {
  const document = await getDocumentById(id);

  const query = {
    text: 'DELETE FROM documents WHERE id = $1 RETURNING id',
    values: [id],
  };

  await pool.query(query);

  if (fs.existsSync(document.path)) {
    fs.unlinkSync(document.path);
  }
};

module.exports = {
  addDocument,
  getDocuments,
  getDocumentById,
  deleteDocumentById,
};