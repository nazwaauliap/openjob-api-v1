const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  postApplicationHandler,
  getApplicationsHandler,
  getApplicationByIdHandler,
  getApplicationsByUserIdHandler,
  getApplicationsByJobIdHandler,
  putApplicationByIdHandler,
  deleteApplicationByIdHandler,
} = require('../controllers/applications.controller');

const router = express.Router();

router.post('/applications', authMiddleware, postApplicationHandler);
router.get('/applications', authMiddleware, getApplicationsHandler);
router.get('/applications/user/:userId', authMiddleware, getApplicationsByUserIdHandler);
router.get('/applications/job/:jobId', authMiddleware, getApplicationsByJobIdHandler);
router.get('/applications/:id', authMiddleware, getApplicationByIdHandler);
router.put('/applications/:id', authMiddleware, putApplicationByIdHandler);
router.delete('/applications/:id', authMiddleware, deleteApplicationByIdHandler);

module.exports = router;