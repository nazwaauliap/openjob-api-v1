const express = require('express');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

const {
  postDocumentHandler,
  getDocumentsHandler,
  getDocumentByIdHandler,
  deleteDocumentByIdHandler,
} = require('../controllers/documents.controller');

const router = express.Router();

router.get('/documents', getDocumentsHandler);
router.get('/documents/:id', getDocumentByIdHandler);

router.post(
  '/documents',
  authMiddleware,
  upload.single('document'),
  postDocumentHandler
);

router.delete('/documents/:id', authMiddleware, deleteDocumentByIdHandler);

module.exports = router;