const express = require('express');
const pool = require('./config/database');
const usersRoutes = require('./routes/users.routes');
const authenticationsRoutes = require('./routes/authentications.routes');
const profileRoutes = require('./routes/profile.routes');
const companiesRoutes = require('./routes/companies.routes');
const categoriesRoutes = require('./routes/categories.routes');
const jobsRoutes = require('./routes/jobs.routes');
const applicationsRoutes = require('./routes/applications.routes');
const bookmarksRoutes = require('./routes/bookmarks.routes');
const documentsRoutes = require('./routes/documents.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'OpenJob API is running',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
  });
});

app.get('/health/db', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.status(200).json({
      status: 'success',
      message: 'Connected to PostgreSQL',
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Routes
app.use(usersRoutes);
app.use(authenticationsRoutes);
app.use(profileRoutes);
app.use(companiesRoutes);
app.use(categoriesRoutes);
app.use(jobsRoutes);
app.use(applicationsRoutes);
app.use(bookmarksRoutes);
app.use(documentsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'failed',
    message: 'Route tidak ditemukan',
  });
});

// Error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'failed',
    message: error.message,
  });
});

module.exports = app;