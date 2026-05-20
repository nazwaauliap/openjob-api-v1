const crypto = require('crypto');
const pool = require('../config/database');

const normalizeJob = (row) => row;

const addJob = async (payload) => {
  const id = `job-${crypto.randomUUID()}`;

  const companyId = payload.companyId || payload.company_id;
  const categoryId = payload.categoryId || payload.category_id;
  const location = payload.location || payload.location_city || payload.location_type || null;
  const salary = payload.salary || payload.salary_max || payload.salary_min || null;

  const query = {
    text: `
      INSERT INTO jobs (id, title, description, location, salary, company_id, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, title, description, location, salary, company_id, category_id, created_at, updated_at
    `,
    values: [
      id,
      payload.title,
      payload.description,
      location,
      salary,
      companyId,
      categoryId,
    ],
  };

  const result = await pool.query(query);
  return normalizeJob(result.rows[0]);
};

const getJobs = async ({ title, companyName } = {}) => {
  let queryText = `
    SELECT 
      jobs.id,
      jobs.title,
      jobs.description,
      jobs.location,
      jobs.salary,
      jobs.company_id,
      companies.name AS company_name,
      jobs.category_id,
      categories.name AS category_name,
      jobs.created_at,
      jobs.updated_at
    FROM jobs
    JOIN companies ON companies.id = jobs.company_id
    JOIN categories ON categories.id = jobs.category_id
  `;

  const conditions = [];
  const values = [];

  if (title) {
    values.push(`%${title}%`);
    conditions.push(`jobs.title ILIKE $${values.length}`);
  }

  if (companyName) {
    values.push(`%${companyName}%`);
    conditions.push(`companies.name ILIKE $${values.length}`);
  }

  if (conditions.length) {
    queryText += ` WHERE ${conditions.join(' AND ')}`;
  }

  queryText += ' ORDER BY jobs.created_at DESC';

  const result = await pool.query({
    text: queryText,
    values,
  });

  return result.rows.map(normalizeJob);
};

const getJobById = async (id) => {
  const query = {
    text: `
      SELECT 
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.salary,
        jobs.company_id,
        companies.name AS company_name,
        jobs.category_id,
        categories.name AS category_name,
        jobs.created_at,
        jobs.updated_at
      FROM jobs
      JOIN companies ON companies.id = jobs.company_id
      JOIN categories ON categories.id = jobs.category_id
      WHERE jobs.id = $1
    `,
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Job tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return normalizeJob(result.rows[0]);
};

const getJobsByCompanyId = async (companyId) => {
  const query = {
    text: `
      SELECT 
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.salary,
        jobs.company_id,
        companies.name AS company_name,
        jobs.category_id,
        categories.name AS category_name,
        jobs.created_at,
        jobs.updated_at
      FROM jobs
      JOIN companies ON companies.id = jobs.company_id
      JOIN categories ON categories.id = jobs.category_id
      WHERE jobs.company_id = $1
      ORDER BY jobs.created_at DESC
    `,
    values: [companyId],
  };

  const result = await pool.query(query);
  return result.rows.map(normalizeJob);
};

const getJobsByCategoryId = async (categoryId) => {
  const query = {
    text: `
      SELECT 
        jobs.id,
        jobs.title,
        jobs.description,
        jobs.location,
        jobs.salary,
        jobs.company_id,
        companies.name AS company_name,
        jobs.category_id,
        categories.name AS category_name,
        jobs.created_at,
        jobs.updated_at
      FROM jobs
      JOIN companies ON companies.id = jobs.company_id
      JOIN categories ON categories.id = jobs.category_id
      WHERE jobs.category_id = $1
      ORDER BY jobs.created_at DESC
    `,
    values: [categoryId],
  };

  const result = await pool.query(query);
  return result.rows.map(normalizeJob);
};

const editJobById = async (id, payload) => {
  const currentJob = await getJobById(id);

  const title = payload.title ?? currentJob.title;
  const description = payload.description ?? currentJob.description;
  const location = payload.location ?? payload.location_city ?? currentJob.location;
  const salary = payload.salary ?? payload.salary_max ?? payload.salary_min ?? currentJob.salary;
  const companyId = payload.companyId || payload.company_id || currentJob.company_id;
  const categoryId = payload.categoryId || payload.category_id || currentJob.category_id;

  const query = {
    text: `
      UPDATE jobs
      SET title = $1,
          description = $2,
          location = $3,
          salary = $4,
          company_id = $5,
          category_id = $6,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING id, title, description, location, salary, company_id, category_id, created_at, updated_at
    `,
    values: [
      title,
      description,
      location,
      salary,
      companyId,
      categoryId,
      id,
    ],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Job tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }

  return normalizeJob(result.rows[0]);
};

const deleteJobById = async (id) => {
  const query = {
    text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
    values: [id],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    const error = new Error('Job tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
};

module.exports = {
  addJob,
  getJobs,
  getJobById,
  getJobsByCompanyId,
  getJobsByCategoryId,
  editJobById,
  deleteJobById,
};