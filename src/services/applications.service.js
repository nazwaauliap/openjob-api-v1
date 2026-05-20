const crypto = require('crypto');
const pool = require('../config/database');

const addApplication = async (userId, payload) => {
  const id = `application-${crypto.randomUUID()}`;
  const finalUserId = payload.userId || payload.user_id || userId;
  const jobId = payload.jobId || payload.job_id;
  const status = payload.status || 'pending';
  const coverLetter = payload.coverLetter || payload.cover_letter || null;

  const query = {
    text: `
      INSERT INTO applications (id, user_id, job_id, status, cover_letter)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, user_id, job_id, status, cover_letter, created_at, updated_at
    `,
    values: [id, finalUserId, jobId, status, coverLetter],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

const getApplications = async () => {
  const result = await pool.query(`
    SELECT 
      applications.id,
      applications.user_id,
      users.name AS user_name,
      applications.job_id,
      jobs.title AS job_title,
      applications.status,
      applications.cover_letter,
      applications.created_at,
      applications.updated_at
    FROM applications
    JOIN users ON users.id = applications.user_id
    JOIN jobs ON jobs.id = applications.job_id
    ORDER BY applications.created_at DESC
  `);

  return result.rows;
};

const getApplicationById = async (id) => {
  const query = {
    text: `
      SELECT 
        applications.id,
        applications.user_id,
        users.name AS user_name,
        applications.job_id,
        jobs.title AS job_title,
        applications.status,
        applications.cover_letter,
        applications.created_at,
        applications.updated_at
      FROM applications
      JOIN users ON users.id = applications.user_id
      JOIN jobs ON jobs.id = applications.job_id
      WHERE applications.id = $1
    `,
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Application tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const getApplicationsByUserId = async (userId) => {
  const query = {
    text: `
      SELECT 
        applications.id,
        applications.user_id,
        applications.job_id,
        jobs.title AS job_title,
        applications.status,
        applications.cover_letter,
        applications.created_at,
        applications.updated_at
      FROM applications
      JOIN jobs ON jobs.id = applications.job_id
      WHERE applications.user_id = $1
      ORDER BY applications.created_at DESC
    `,
    values: [userId],
  };

  const result = await pool.query(query);
  return result.rows;
};

const getApplicationsByJobId = async (jobId) => {
  const query = {
    text: `
      SELECT 
        applications.id,
        applications.user_id,
        users.name AS user_name,
        applications.job_id,
        applications.status,
        applications.cover_letter,
        applications.created_at,
        applications.updated_at
      FROM applications
      JOIN users ON users.id = applications.user_id
      WHERE applications.job_id = $1
      ORDER BY applications.created_at DESC
    `,
    values: [jobId],
  };

  const result = await pool.query(query);
  return result.rows;
};

const editApplicationStatusById = async (id, { status }) => {
  const query = {
    text: `
      UPDATE applications
      SET status = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, user_id, job_id, status, cover_letter, created_at, updated_at
    `,
    values: [status, id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Application tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

const deleteApplicationById = async (id) => {
  const query = {
    text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Application tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  addApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUserId,
  getApplicationsByJobId,
  editApplicationStatusById,
  deleteApplicationById,
};