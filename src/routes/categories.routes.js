const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  postCategoryHandler,
  getCategoriesHandler,
  getCategoryByIdHandler,
  putCategoryByIdHandler,
  deleteCategoryByIdHandler,
} = require('../controllers/categories.controller');

const router = express.Router();

router.get('/categories', getCategoriesHandler);
router.get('/categories/:id', getCategoryByIdHandler);

router.post('/categories', authMiddleware, postCategoryHandler);
router.put('/categories/:id', authMiddleware, putCategoryByIdHandler);
router.delete('/categories/:id', authMiddleware, deleteCategoryByIdHandler);

module.exports = router;