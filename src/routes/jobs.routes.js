const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  postJobHandler,
  getJobsHandler,
  getJobByIdHandler,
  getJobsByCompanyIdHandler,
  getJobsByCategoryIdHandler,
  putJobByIdHandler,
  deleteJobByIdHandler,
} = require('../controllers/jobs.controller');

const router = express.Router();

router.get('/jobs', getJobsHandler);
router.get('/jobs/company/:companyId', getJobsByCompanyIdHandler);
router.get('/jobs/category/:categoryId', getJobsByCategoryIdHandler);
router.get('/jobs/:id', getJobByIdHandler);

router.post('/jobs', authMiddleware, postJobHandler);
router.put('/jobs/:id', authMiddleware, putJobByIdHandler);
router.delete('/jobs/:id', authMiddleware, deleteJobByIdHandler);

module.exports = router;