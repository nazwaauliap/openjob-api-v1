const express = require('express');
const authMiddleware = require('../middleware/auth');

const {
  postBookmarkHandler,
  getBookmarksHandler,
  getBookmarkByIdHandler,
  deleteBookmarkHandler,
} = require('../controllers/bookmarks.controller');

const router = express.Router();

router.post('/jobs/:jobId/bookmark', authMiddleware, postBookmarkHandler);
router.get('/jobs/:jobId/bookmark/:id', authMiddleware, getBookmarkByIdHandler);
router.delete('/jobs/:jobId/bookmark', authMiddleware, deleteBookmarkHandler);

router.get('/bookmarks', authMiddleware, getBookmarksHandler);

module.exports = router;