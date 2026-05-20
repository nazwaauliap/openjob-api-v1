const crypto = require('crypto');
const pool = require('../config/database');

const addBookmark = async (userId, jobId) => {
  const id = `bookmark-${crypto.randomUUID()}`;

  const query = {
    text: `
      INSERT INTO bookmarks (id, user_id, job_id)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, job_id, created_at
    `,
    values: [id, userId, jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

const getBookmarksByUserId = async (userId) => {
  const query = {
    text: `
      SELECT 
        bookmarks.id,
        bookmarks.user_id,
        bookmarks.job_id,
        jobs.title AS job_title,
        jobs.location,
        jobs.salary,
        jobs.company_id,
        companies.name AS company_name,
        jobs.category_id,
        categories.name AS category_name,
        bookmarks.created_at
      FROM bookmarks
      JOIN jobs ON jobs.id = bookmarks.job_id
      JOIN companies ON companies.id = jobs.company_id
      JOIN categories ON categories.id = jobs.category_id
      WHERE bookmarks.user_id = $1
      ORDER BY bookmarks.created_at DESC
    `,
    values: [userId],
  };

  const result = await pool.query(query);
  return result.rows;
};

const getBookmarkById = async (userId, jobId, bookmarkId) => {
  const query = {
    text: `
      SELECT 
        bookmarks.id,
        bookmarks.user_id,
        bookmarks.job_id,
        jobs.title AS job_title,
        bookmarks.created_at
      FROM bookmarks
      JOIN jobs ON jobs.id = bookmarks.job_id
      WHERE bookmarks.user_id = $1
        AND bookmarks.job_id = $2
        AND bookmarks.id = $3
    `,
    values: [userId, jobId, bookmarkId],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Bookmark tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const deleteBookmarkByUserAndJob = async (userId, jobId) => {
  const query = {
    text: `
      DELETE FROM bookmarks
      WHERE user_id = $1 AND job_id = $2
      RETURNING id
    `,
    values: [userId, jobId],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Bookmark tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  addBookmark,
  getBookmarksByUserId,
  getBookmarkById,
  deleteBookmarkByUserAndJob,
};