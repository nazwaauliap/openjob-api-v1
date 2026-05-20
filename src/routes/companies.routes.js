const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  postCompanyHandler,
  getCompaniesHandler,
  getCompanyByIdHandler,
  putCompanyByIdHandler,
  deleteCompanyByIdHandler,
} = require('../controllers/companies.controller');

const router = express.Router();

router.get('/companies', getCompaniesHandler);
router.get('/companies/:id', getCompanyByIdHandler);

router.post('/companies', authMiddleware, postCompanyHandler);
router.put('/companies/:id', authMiddleware, putCompanyByIdHandler);
router.delete('/companies/:id', authMiddleware, deleteCompanyByIdHandler);

module.exports = router;